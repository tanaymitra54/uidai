from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')

STATE_DISTRICT_MAP = {
    "Andaman & Nicobar Islands": ["Nicobar", "North And Middle Andaman", "South Andaman", "Andamans"],
    "Andaman and Nicobar Islands": ["Nicobar", "North And Middle Andaman", "South Andaman", "Andamans"],
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Sri Potti Sriramulu Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Anakapalli", "Ananthapuramu", "Bapatla", "Eluru", "Kakinada", "Nellore", "Palnadu", "Parvathipuram Manyam", "Sri Sathya Sai", "Tirupati", "Y. S. R", "Kakinada", "Rajahmundry"],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lepa-Rada", "Lohit", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    "Assam": ["Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metro", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Marigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri", "Baksa", "Charaideo", "Hojai", "Biswanath", "South Salmara Mankachar", "Majuli", "Tamulpur", "Bajali"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "Bhabua", "Bidar", "Lalitpur", "Balrampur"],
    "Chandigarh": ["Chandigarh"],
    "Chhatisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariyaband", "Gaurela-pendra-marwahi", "Janjgir - Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "Bijapur", "Khairagarh Chhuikhadan Gandai", "Manendragarh-Chirmiri-Bharatpur"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariyaband", "Gaurela-pendra-marwahi", "Janjgir - Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Dadra & Nagar Haveli": ["Dadra & Nagar Haveli", "Dadra and Nagar Haveli"],
    "Dadra and Nagar Haveli": ["Dadra & Nagar Haveli", "Dadra and Nagar Haveli", "Dadra and Nagar Haveli and Daman and Diu"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Dadra & Nagar Haveli", "Dadra and Nagar Haveli", "Daman", "Diu", "Daman & Diu"],
    "Daman & Diu": ["Daman", "Diu", "Daman & Diu", "Daman and Diu"],
    "Daman and Diu": ["Daman", "Diu"],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banas Kantha", "Bharuch", "Bhavnagar", "Botad", "Chhotaudepur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panch Mahals", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad", "Ahmednagar"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jammu & Kashmir": ["Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur", "Leh", "Kashmir"],
    "Jammu and Kashmir": ["Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur", "Leh"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Pashchimi Singhbhum", "Purbi Singhbhum", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belagavi", "Bellary", "Bidar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Hubli", "Kalaburagi", "Kannur", "Karwar", "Kolar", "Koppal", "Mysore", "Mysuru", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir", "Ballari", "Bengaluru", "Bengaluru Rural", "Bengaluru South", "Kalaburagi", "Mangalore", "Shivamogga"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad", "Kanniyakumari", "Thiruvallur", "Chennai"],
    "Ladakh": ["Kargil", "Leh"],
    "Lakshadweep": ["Lakshadweep"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashok Nagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jajapur", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsimhapur", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha", "Mahoba", "Haridwar"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal", "Amravati", "Navi Mumbai"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Saitual", "Khawzawl"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto", "Niuland"],
    "ODISHA": ["Angul", "Balangir", "Baleshwar", "Balugaon", "Bargarh", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajapur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangapur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "Baleswar", "Khorda"],
    "Odisha": ["Angul", "Balangir", "Baleshwar", "Bargarh", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangapur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "Baleswar", "Balangir", "Bhadrak"],
    "Orissa": ["Angul", "Balangir", "Baleshwar", "Bargarh", "Boudh", "Cuttack", "Dhenkanal", "Ganjam", "Jajapur", "Khordha", "Koraput", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh"],
    "Pondicherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "S.A.S Nagar", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Sumerpur", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Gangtok"],
    "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukkudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tirupur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar", "Chengalpattu", "Kallakurichi", "Mayiladuthurai", "Ranipet", "Tenkasi", "Tirupathur"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagitial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Yadadri", "Warangal Urban", "Warangal Rural", "Hanumakonda", "Karim Nagar"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "South Tripura", "Unakoti", "West Tripura", "Sepahijala"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Haridwar", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Rae Bareli", "Rampur", "Saharanpur", "Sahjahanpur", "Sambhal", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Ayodhya", "Lakhimpur Kheri"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "Uttaranchal": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "WEST BENGAL": ["Alipurduar", "Bankura", "Barddhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Hugli", "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur", "West Midnapore", "East Midnapore", "West Bengal"],
    "West Bengal": ["Alipurduar", "Bankura", "Barddhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Hugli", "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur", "West Midnapore", "East Midnapore", "Bardhaman", "Burdwan", "Haora", "Bally Jagachha", "Kolkata", "Medinipur"],
    "andhra pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
    "odisha": ["Angul", "Balangir", "Baleshwar", "Bargarh", "Boudh", "Cuttack", "Dhenkanal", "Ganjam", "Jajpur", "Khordha", "Koraput", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh"],
    "west Bengal": ["Alipurduar", "Bankura", "Barddhaman", "Birbhum", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "South 24 Parganas"]
}

def normalize_string(s):
    return s.strip().lower().replace("  ", " ").replace("  ", " ")

def is_valid_state_district(state, district):
    state_norm = normalize_string(state)
    district_norm = normalize_string(district)
    
    districts = []
    if state_norm in STATE_DISTRICT_MAP:
        districts = STATE_DISTRICT_MAP[state_norm]
    elif state in STATE_DISTRICT_MAP:
        districts = STATE_DISTRICT_MAP[state]
    
    for d in districts:
        if normalize_string(d) == district_norm:
            return True
    return False

def get_districts_for_state(state):
    state_norm = normalize_string(state)
    if state_norm in STATE_DISTRICT_MAP:
        return STATE_DISTRICT_MAP[state_norm]
    if state in STATE_DISTRICT_MAP:
        return STATE_DISTRICT_MAP[state]
    return []

print("Loading models...")

rf_children_model = joblib.load(os.path.join(MODEL_DIR, 'rf_children_model.pkl'))
rf_adults_model = joblib.load(os.path.join(MODEL_DIR, 'rf_adults_model.pkl'))
gb_classifier_model = joblib.load(os.path.join(MODEL_DIR, 'gb_classifier_model.pkl'))
iso_forest_model = joblib.load(os.path.join(MODEL_DIR, 'isolation_forest_model.pkl'))
kmeans_model = joblib.load(os.path.join(MODEL_DIR, 'kmeans_model.pkl'))
scaler_classification = joblib.load(os.path.join(MODEL_DIR, 'scaler_classification.pkl'))
scaler_clustering = joblib.load(os.path.join(MODEL_DIR, 'scaler_clustering.pkl'))
label_encoder_state = joblib.load(os.path.join(MODEL_DIR, 'label_encoder_state.pkl'))
label_encoder_district = joblib.load(os.path.join(MODEL_DIR, 'label_encoder_district.pkl'))

with open(os.path.join(MODEL_DIR, 'feature_info.json'), 'r') as f:
    feature_info = json.load(f)

with open(os.path.join(MODEL_DIR, 'dashboard_stats.json'), 'r') as f:
    dashboard_stats = json.load(f)

print("All models loaded successfully!")


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/states', methods=['GET'])
def get_states():
    return jsonify({
        'states': feature_info['states']
    })


@app.route('/api/districts/<state>', methods=['GET'])
def get_districts_for_state_api(state):
    districts = get_districts_for_state(state)
    if districts:
        return jsonify({
            'state': state,
            'districts': districts
        })
    else:
        return jsonify({
            'state': state,
            'districts': [],
            'warning': 'No district mapping found for this state. All districts will be shown.'
        })


@app.route('/api/districts', methods=['GET'])
def get_districts():
    return jsonify({
        'districts': feature_info['districts']
    })


@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify(dashboard_stats)


@app.route('/api/predict/enrollment', methods=['POST'])
def predict_enrollment():
    try:
        data = request.json
        
        state = data.get('state')
        district = data.get('district')
        month = data.get('month', 1)
        day = data.get('day', 1)
        pct_children = data.get('pct_children', 50.0)
        pct_adults = data.get('pct_adults', 50.0)
        
        if state not in feature_info['states']:
            return jsonify({'error': f'Invalid state. Must be one of: {feature_info["states"][:5]}...'}), 400
        
        if district not in feature_info['districts']:
            return jsonify({'error': f'Invalid district. Must be one of: {feature_info["districts"][:5]}...'}), 400
        
        if not is_valid_state_district(state, district):
            return jsonify({
                'error': f'Invalid combination: {district} is not a district in {state}. Please select a valid district for the chosen state.',
                'valid_districts': get_districts_for_state(state)[:10]
            }), 400
        
        state_encoded = label_encoder_state.transform([state])[0]
        district_encoded = label_encoder_district.transform([district])[0]
        
        features = np.array([[state_encoded, district_encoded, month, day, pct_children, pct_adults]])
        
        pred_children = rf_children_model.predict(features)[0]
        pred_adults = rf_adults_model.predict(features)[0]
        
        return jsonify({
            'children_enrollment': round(float(pred_children), 2),
            'adult_enrollment': round(float(pred_adults), 2),
            'total_enrollment': round(float(pred_children + pred_adults), 2),
            'input': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/classify/enrollment', methods=['POST'])
def classify_enrollment():
    try:
        data = request.json
        
        state = data.get('state')
        district = data.get('district')
        month = data.get('month', 1)
        day = data.get('day', 1)
        pct_children = data.get('pct_children', 50.0)
        pct_adults = data.get('pct_adults', 50.0)
        
        if state not in feature_info['states']:
            return jsonify({'error': f'Invalid state'}), 400
        
        if district not in feature_info['districts']:
            return jsonify({'error': f'Invalid district'}), 400
        
        if not is_valid_state_district(state, district):
            return jsonify({
                'error': f'Invalid combination: {district} is not a district in {state}',
                'valid_districts': get_districts_for_state(state)[:10]
            }), 400
        
        state_encoded = label_encoder_state.transform([state])[0]
        district_encoded = label_encoder_district.transform([district])[0]
        
        features = np.array([[state_encoded, district_encoded, month, day, pct_children, pct_adults]])
        features_scaled = scaler_classification.transform(features)
        
        prob_high = gb_classifier_model.predict_proba(features_scaled)[0][1]
        prediction = 1 if prob_high > 0.5 else 0
        
        return jsonify({
            'prediction': 'high' if prediction == 1 else 'low',
            'probability': round(float(prob_high), 4),
            'confidence': round(abs(prob_high - 0.5) * 2, 4)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/detect/anomaly', methods=['POST'])
def detect_anomaly():
    try:
        data = request.json
        
        bio_age_5_17 = data.get('bio_age_5_17', 0)
        bio_age_17 = data.get('bio_age_17', 0)
        total_bio = data.get('total_bio', 0)
        pct_children = data.get('pct_children', 50.0)
        
        features = np.array([[bio_age_5_17, bio_age_17, total_bio, pct_children]])
        
        prediction = iso_forest_model.predict(features)[0]
        score = iso_forest_model.score_samples(features)[0]
        
        return jsonify({
            'is_anomaly': bool(prediction == -1),
            'anomaly_score': round(float(score), 4),
            'status': 'anomaly' if prediction == -1 else 'normal'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/cluster', methods=['POST'])
def predict_cluster():
    try:
        data = request.json
        
        bio_age_5_17 = data.get('bio_age_5_17', 0)
        bio_age_17 = data.get('bio_age_17', 0)
        total_bio = data.get('total_bio', 0)
        pct_children = data.get('pct_children', 50.0)
        
        features = np.array([[bio_age_5_17, bio_age_17, total_bio, pct_children]])
        features_scaled = scaler_clustering.transform(features)
        
        cluster = kmeans_model.predict(features_scaled)[0]
        
        return jsonify({
            'cluster': int(cluster),
            'total_clusters': feature_info['optimal_clusters']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/analyze', methods=['POST'])
def comprehensive_analysis():
    try:
        data = request.json
        
        state = data.get('state')
        district = data.get('district')
        month = data.get('month', 1)
        day = data.get('day', 1)
        bio_age_5_17 = data.get('bio_age_5_17', 0)
        bio_age_17 = data.get('bio_age_17', 0)
        
        if state not in feature_info['states']:
            return jsonify({'error': f'Invalid state'}), 400
        
        if district not in feature_info['districts']:
            return jsonify({'error': f'Invalid district'}), 400
        
        if not is_valid_state_district(state, district):
            return jsonify({
                'error': f'Invalid combination: {district} is not a district in {state}',
                'valid_districts': get_districts_for_state(state)[:10]
            }), 400
        
        total_bio = bio_age_5_17 + bio_age_17
        pct_children = (bio_age_5_17 / total_bio * 100) if total_bio > 0 else 50.0
        pct_adults = (bio_age_17 / total_bio * 100) if total_bio > 0 else 50.0
        
        state_encoded = label_encoder_state.transform([state])[0]
        district_encoded = label_encoder_district.transform([district])[0]
        
        reg_features = np.array([[state_encoded, district_encoded, month, day, pct_children, pct_adults]])
        
        pred_children = rf_children_model.predict(reg_features)[0]
        pred_adults = rf_adults_model.predict(reg_features)[0]
        
        class_features_scaled = scaler_classification.transform(reg_features)
        prob_high = gb_classifier_model.predict_proba(class_features_scaled)[0][1]
        
        anomaly_features = np.array([[bio_age_5_17, bio_age_17, total_bio, pct_children]])
        anomaly_pred = iso_forest_model.predict(anomaly_features)[0]
        anomaly_score = iso_forest_model.score_samples(anomaly_features)[0]
        
        cluster_features_scaled = scaler_clustering.transform(anomaly_features)
        cluster = kmeans_model.predict(cluster_features_scaled)[0]
        
        return jsonify({
            'enrollment': {
                'children': round(float(pred_children), 2),
                'adults': round(float(pred_adults), 2),
                'total': round(float(pred_children + pred_adults), 2)
            },
            'classification': {
                'prediction': 'high' if prob_high > 0.5 else 'low',
                'probability': round(float(prob_high), 4)
            },
            'anomaly': {
                'is_anomaly': bool(anomaly_pred == -1),
                'score': round(float(anomaly_score), 4),
                'status': 'anomaly' if anomaly_pred == -1 else 'normal'
            },
            'cluster': {
                'id': int(cluster),
                'total_clusters': feature_info['optimal_clusters']
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)

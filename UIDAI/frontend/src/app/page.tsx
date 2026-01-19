'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FormData {
  state: string;
  district: string;
  month: string;
  day: string;
  bio_age_5_17: string;
  bio_age_17: string;
}

export default function Home() {
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    district: '',
    month: '1',
    day: '1',
    bio_age_5_17: '100',
    bio_age_17: '150',
  });

  const [results, setResults] = useState<any>(null);
  const [comprehensiveResults, setComprehensiveResults] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [statesRes, districtsRes, statsRes] = await Promise.all([
        api.getStates(),
        api.getDistricts(),
        api.getStats(),
      ]);
      setStates(statesRes.states);
      setAllDistricts(districtsRes.districts);
      setDistricts(districtsRes.districts);
      setStats(statsRes);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleStateChange = async (value: string) => {
    setFormData({ ...formData, state: value, district: '' });
    setError(null);
    setResults(null);
    setComprehensiveResults(null);
    
    try {
      const result = await api.getDistrictsForState(value);
      if (result.districts && result.districts.length > 0) {
        setDistricts(result.districts);
      } else {
        setDistricts(allDistricts);
      }
    } catch (err) {
      setDistricts(allDistricts);
    }
  };

  const handlePredictEnrollment = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.predictEnrollment({
        state: formData.state,
        district: formData.district,
        month: parseInt(formData.month),
        day: parseInt(formData.day),
        pct_children: 50,
        pct_adults: 50,
      });
      setResults({ enrollment: result });
    } catch (error: any) {
      setError(error.message || 'Error predicting enrollment');
      console.error('Error predicting enrollment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassify = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.classifyEnrollment({
        state: formData.state,
        district: formData.district,
        month: parseInt(formData.month),
        day: parseInt(formData.day),
        pct_children: 50,
        pct_adults: 50,
      });
      setResults({ classification: result });
    } catch (error: any) {
      setError(error.message || 'Error classifying enrollment');
      console.error('Error classifying:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectAnomaly = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.detectAnomaly({
        bio_age_5_17: parseFloat(formData.bio_age_5_17),
        bio_age_17: parseFloat(formData.bio_age_17),
        total_bio: parseFloat(formData.bio_age_5_17) + parseFloat(formData.bio_age_17),
        pct_children: 50,
      });
      setResults({ anomaly: result });
    } catch (error: any) {
      setError(error.message || 'Error detecting anomaly');
      console.error('Error detecting anomaly:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComprehensiveAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.analyze({
        state: formData.state,
        district: formData.district,
        month: parseInt(formData.month),
        day: parseInt(formData.day),
        bio_age_5_17: parseFloat(formData.bio_age_5_17),
        bio_age_17: parseFloat(formData.bio_age_17),
      });
      setComprehensiveResults(result);
    } catch (error: any) {
      setError(error.message || 'Error analyzing');
      console.error('Error analyzing:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollmentData = stats?.summary ? [
    { name: 'Children', value: stats.summary.total_children },
    { name: 'Adults', value: stats.summary.total_adults },
  ] : [];

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Aadhaar Biometric Analysis
          </h1>
          <p className="text-lg text-slate-600">
            ML-Powered Enrollment Prediction & Analysis Platform
          </p>
        </div>

        {stats?.summary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Enrollments</CardDescription>
                <CardTitle className="text-2xl">{stats.summary.total_enrollments.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>States</CardDescription>
                <CardTitle className="text-2xl">{stats.summary.num_states}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Districts</CardDescription>
                <CardTitle className="text-2xl">{stats.summary.num_districts}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pincodes</CardDescription>
                <CardTitle className="text-2xl">{stats.summary.num_pincodes}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>High Enrollment Areas</CardDescription>
                <CardTitle className="text-2xl">{stats.summary.high_enrollment_areas}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Select state and district to get predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={handleStateChange}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select value={formData.district} onValueChange={(value) => {
                  setFormData({ ...formData, district: value });
                  setError(null);
                }}>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Select value={formData.month} onValueChange={(value) => setFormData({ ...formData, month: value })}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio_age_5_17">Children (5-17 years)</Label>
                <Input
                  id="bio_age_5_17"
                  type="number"
                  value={formData.bio_age_5_17}
                  onChange={(e) => setFormData({ ...formData, bio_age_5_17: e.target.value })}
                  placeholder="Enter count"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio_age_17">Adults (17+ years)</Label>
                <Input
                  id="bio_age_17"
                  type="number"
                  value={formData.bio_age_17}
                  onChange={(e) => setFormData({ ...formData, bio_age_17: e.target.value })}
                  placeholder="Enter count"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="enrollment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enrollment">Enrollment Prediction</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Volume Prediction</CardTitle>
                <CardDescription>Predict expected enrollment numbers for children and adults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handlePredictEnrollment} 
                  disabled={loading || !formData.state || !formData.district} 
                  className="w-full"
                >
                  {loading ? 'Predicting...' : 'Predict Enrollment'}
                </Button>

                {results?.enrollment && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Children</CardDescription>
                        <CardTitle className="text-3xl text-blue-600">
                          {results.enrollment.children_enrollment.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Adults</CardDescription>
                        <CardTitle className="text-3xl text-green-600">
                          {results.enrollment.adult_enrollment.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total</CardDescription>
                        <CardTitle className="text-3xl text-purple-600">
                          {results.enrollment.total_enrollment.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Classification</CardTitle>
                <CardDescription>Classify enrollment as high or low</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleClassify} 
                  disabled={loading || !formData.state || !formData.district} 
                  className="w-full"
                >
                  {loading ? 'Classifying...' : 'Classify Enrollment'}
                </Button>

                {results?.classification && (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-center">
                      <Badge variant={results.classification.prediction === 'high' ? 'default' : 'secondary'} className="text-lg px-6 py-2">
                        {results.classification.prediction.toUpperCase()} ENROLLMENT
                      </Badge>
                    </div>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Probability</CardDescription>
                        <CardTitle className="text-3xl">
                          {(results.classification.probability * 100).toFixed(2)}%
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Confidence</CardDescription>
                        <CardTitle className="text-3xl">
                          {(results.classification.confidence * 100).toFixed(2)}%
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomaly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>Detect unusual patterns in enrollment data (Changes based on Children/Adult values)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-md text-sm text-blue-800">
                  <strong>Tip:</strong> Enter children (5-17) and adult (17+) counts above, then click Detect Anomaly. 
                  Different values produce different scores based on the Isolation Forest model.
                </div>
                <Button 
                  onClick={handleDetectAnomaly} 
                  disabled={loading} 
                  className="w-full"
                >
                  {loading ? 'Detecting...' : 'Detect Anomaly'}
                </Button>

                {results?.anomaly && (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-center">
                      <Badge variant={results.anomaly.is_anomaly ? 'destructive' : 'default'} className="text-lg px-6 py-2">
                        {results.anomaly.status.toUpperCase()}
                      </Badge>
                    </div>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Anomaly Score (lower = more anomalous)</CardDescription>
                        <CardTitle className="text-3xl">
                          {results.anomaly.anomaly_score.toFixed(4)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <p className="text-xs text-gray-500 text-center">
                      Score range: ~-0.9 (highly anomalous) to ~-0.3 (normal)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comprehensive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Analysis</CardTitle>
                <CardDescription>Full analysis with all models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleComprehensiveAnalysis} 
                  disabled={loading || !formData.state || !formData.district} 
                  className="w-full"
                >
                  {loading ? 'Analyzing...' : 'Run Comprehensive Analysis'}
                </Button>

                {comprehensiveResults && (
                  <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Children Enrollment</CardDescription>
                          <CardTitle className="text-2xl text-blue-600">
                            {comprehensiveResults.enrollment.children.toLocaleString()}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Adult Enrollment</CardDescription>
                          <CardTitle className="text-2xl text-green-600">
                            {comprehensiveResults.enrollment.adults.toLocaleString()}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Total Enrollment</CardDescription>
                          <CardTitle className="text-2xl text-purple-600">
                            {comprehensiveResults.enrollment.total.toLocaleString()}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Classification</CardDescription>
                          <div className="flex items-center gap-2">
                            <Badge variant={comprehensiveResults.classification.prediction === 'high' ? 'default' : 'secondary'}>
                              {comprehensiveResults.classification.prediction.toUpperCase()}
                            </Badge>
                            <CardTitle className="text-xl">
                              {(comprehensiveResults.classification.probability * 100).toFixed(1)}%
                            </CardTitle>
                          </div>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Anomaly Status</CardDescription>
                          <div className="flex items-center gap-2">
                            <Badge variant={comprehensiveResults.anomaly.is_anomaly ? 'destructive' : 'default'}>
                              {comprehensiveResults.anomaly.status.toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Cluster</CardDescription>
                          <CardTitle className="text-xl">
                            {comprehensiveResults.cluster.id} / {comprehensiveResults.cluster.total_clusters}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {stats?.summary && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={enrollmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {enrollmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
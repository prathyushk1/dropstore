import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Database, Users, Package } from 'lucide-react'

export default async function TestDatabasePage() {
  const supabase = createClient()
  
  // Test 1: Check connection
  let connectionStatus = { success: false, message: '' }
  try {
    const { error } = await supabase.from('categories').select('count').single()
    if (!error || error.code === 'PGRST116') {
      connectionStatus = { success: true, message: 'Connected to Supabase!' }
    } else {
      connectionStatus = { success: false, message: error.message }
    }
  } catch (err) {
    connectionStatus = { success: false, message: 'Connection failed' }
  }

  // Test 2: Count categories
  let categoriesCount = 0
  try {
    const { count } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
    categoriesCount = count || 0
  } catch (err) {
    categoriesCount = -1
  }

  // Test 3: Count products
  let productsCount = 0
  try {
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    productsCount = count || 0
  } catch (err) {
    productsCount = -1
  }

  // Test 4: Fetch sample categories
  let sampleCategories: any[] = []
  try {
    const { data } = await supabase
      .from('categories')
      .select('name, slug')
      .limit(5)
    sampleCategories = data || []
  } catch (err) {
    sampleCategories = []
  }

  // Test 5: Check auth
  let authStatus = { configured: false, message: '' }
  try {
    const { data: { session } } = await supabase.auth.getSession()
    authStatus = { 
      configured: true, 
      message: session ? 'User logged in' : 'No active session (normal for test)' 
    }
  } catch (err) {
    authStatus = { configured: false, message: 'Auth not configured' }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Database Connection Test</h1>
          <p className="text-muted-foreground">
            Testing your Supabase connection and database setup
          </p>
        </div>

        <div className="space-y-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {connectionStatus.success ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-600">Connected!</p>
                      <p className="text-sm text-muted-foreground">
                        {connectionStatus.message}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-600">Connection Failed</p>
                      <p className="text-sm text-muted-foreground">
                        {connectionStatus.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Database Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Categories</span>
                    <Badge variant={categoriesCount >= 0 ? 'default' : 'destructive'}>
                      {categoriesCount >= 0 ? `${categoriesCount} rows` : 'Error'}
                    </Badge>
                  </div>
                  {categoriesCount >= 0 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Products</span>
                    <Badge variant={productsCount >= 0 ? 'default' : 'destructive'}>
                      {productsCount >= 0 ? `${productsCount} rows` : 'Error'}
                    </Badge>
                  </div>
                  {productsCount >= 0 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>

              {sampleCategories.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Sample Categories:</p>
                  <div className="space-y-1">
                    {sampleCategories.map((cat, i) => (
                      <div key={i} className="text-sm text-muted-foreground">
                        • {cat.name} ({cat.slug})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {authStatus.configured ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-600">Configured</p>
                      <p className="text-sm text-muted-foreground">
                        {authStatus.message}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-600">Not Configured</p>
                      <p className="text-sm text-muted-foreground">
                        {authStatus.message}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">NEXT_PUBLIC_SUPABASE_URL</span>
                <Badge variant={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'default' : 'destructive'}>
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <Badge variant={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'default' : 'destructive'}>
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SUPABASE_SERVICE_ROLE_KEY</span>
                <Badge variant={process.env.SUPABASE_SERVICE_ROLE_KEY ? 'default' : 'destructive'}>
                  {process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-900">
              {connectionStatus.success ? (
                <div className="space-y-2">
                  <p className="font-semibold">✅ Connection successful!</p>
                  <p className="text-sm">You can now:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Implement authentication</li>
                    <li>• Connect products to database</li>
                    <li>• Make cart functional</li>
                    <li>• Build checkout flow</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-semibold">⚠️ Connection failed</p>
                  <p className="text-sm">Check:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• .env.local file exists</li>
                    <li>• API keys are correct</li>
                    <li>• Database tables are created</li>
                    <li>• Dev server was restarted</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

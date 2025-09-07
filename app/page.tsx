import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Settings, FileText, CreditCard } from "lucide-react"
import AvailableServices from "@/utils/services"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Commission Portal</h1>
          <p className="text-xl text-red-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional service management platform for CAC registration, TIN, SCUML, and international passport
            services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Settings className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage services, view analytics, and configure portal settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full">Access Admin</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Agent Portal</CardTitle>
              <CardDescription>Browse services, pay commissions, and generate client links</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/agent/1">
                <Button className="w-full bg-transparent" variant="outline">
                  Access Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Client Forms</CardTitle>
              <CardDescription>Secure form submission portal for service applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forms">
                <Button className="w-full bg-transparent" variant="outline">
                  View Forms
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CreditCard className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <CardTitle>Payments</CardTitle>
              <CardDescription>Secure commission payments via Paystack integration</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/payments">
                <Button className="w-full bg-transparent" variant="outline">
                  View Payments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Services</h2>
            
<AvailableServices/>
            
          </div>
        </div>
      </div>
    </div>
  )
}

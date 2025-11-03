import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Package, Truck } from "lucide-react";

const stores = [
  { id: 1, name: "Store A - Karachi", sent: 100, sold: 75, remaining: 25 },
  { id: 2, name: "Store B - Lahore", sent: 80, sold: 60, remaining: 20 },
  { id: 3, name: "Store C - Islamabad", sent: 60, sold: 45, remaining: 15 },
];

const shipments = [
  { id: 1, tracking: "TRK123456", courier: "TCS", status: "In Transit", progress: 60 },
  { id: 2, tracking: "TRK123457", courier: "Leopards", status: "Delivered", progress: 100 },
  { id: 3, tracking: "TRK123458", courier: "M&P", status: "Processing", progress: 20 },
];

const Consignment = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Consignment & Shipment</h1>
          <p className="text-muted-foreground">Track consignment stores and shipments</p>
        </div>

        <Tabs defaultValue="stores" className="space-y-4">
          <TabsList>
            <TabsTrigger value="stores">
              <Store className="w-4 h-4 mr-2" />
              Consignment Stores
            </TabsTrigger>
            <TabsTrigger value="shipments">
              <Truck className="w-4 h-4 mr-2" />
              Shipments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stores" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store) => (
                <Card key={store.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items Sent:</span>
                        <span className="font-medium">{store.sent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sold:</span>
                        <span className="font-medium text-success">{store.sold}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Remaining:</span>
                        <span className="font-medium">{store.remaining}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Stock Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipments" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Tracking Number</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Courier</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Progress</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {shipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-muted/30">
                          <td className="px-4 py-3 font-mono text-sm">{shipment.tracking}</td>
                          <td className="px-4 py-3">{shipment.courier}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                shipment.status === "Delivered"
                                  ? "default"
                                  : shipment.status === "In Transit"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {shipment.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${shipment.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">{shipment.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="ghost">
                              Track
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Consignment;

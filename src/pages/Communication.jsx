import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";

const logs = [
  { id: 1, type: "WhatsApp", customer: "Customer A", message: "Invoice #1001 sent", date: "2024-03-01", status: "Sent" },
  { id: 2, type: "Email", customer: "Customer B", message: "Payment reminder", date: "2024-03-01", status: "Pending" },
  { id: 3, type: "WhatsApp", customer: "Customer C", message: "Order confirmation", date: "2024-02-28", status: "Sent" },
];

const Communication = () => {
  const handleSaveTemplate = () => {
    toast.success("Template saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Communication Center</h1>
          <p className="text-muted-foreground">Manage WhatsApp and Email notifications</p>
        </div>

        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="logs">Notification Logs</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Message</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/30">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {log.type === "WhatsApp" ? (
                                <MessageSquare className="w-4 h-4 text-success" />
                              ) : (
                                <Mail className="w-4 h-4 text-primary" />
                              )}
                              <span className="font-medium">{log.type}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{log.customer}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{log.message}</td>
                          <td className="px-4 py-3 text-sm">{log.date}</td>
                          <td className="px-4 py-3">
                            <Badge variant={log.status === "Sent" ? "default" : "secondary"}>
                              {log.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <div className="space-y-4">
              <Tabs defaultValue="whatsapp">
                <TabsList>
                  <TabsTrigger value="whatsapp">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp Templates
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Templates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Invoice Notification</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-1" />
                        New Template
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Hello {customerName}, your invoice #{invoiceNo} is ready..."
                        rows={6}
                        defaultValue="Hello {customerName},\n\nYour invoice #{invoiceNo} for PKR {amount} is ready.\n\nThank you for your business!"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveTemplate}>Save Template</Button>
                        <Button variant="outline">Test Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Payment Reminder</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-1" />
                        New Template
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Subject: Payment Reminder"
                        rows={8}
                        defaultValue="Dear {customerName},\n\nThis is a friendly reminder about your pending invoice #{invoiceNo}.\n\nAmount Due: PKR {amount}\nDue Date: {dueDate}\n\nPlease process the payment at your earliest convenience.\n\nBest regards"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveTemplate}>Save Template</Button>
                        <Button variant="outline">Test Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Communication;

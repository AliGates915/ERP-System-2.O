import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

const Sales = () => {
  const [applyVAT, setApplyVAT] = useState(false);
  const [items, setItems] = useState([{ id: 1, name: "", qty: 0, rate: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", qty: 0, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const vat = applyVAT ? subtotal * 0.17 : 0;
    return { subtotal, vat, total: subtotal + vat };
  };

  const { subtotal, vat, total } = calculateTotal();

  const handleGenerateInvoice = () => {
    toast.success("Invoice generated successfully!");
  };

  const handleSendWhatsApp = () => {
    toast.success("Invoice sent via WhatsApp!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sales & Invoicing</h1>
          <p className="text-muted-foreground">Create invoices with VAT margin calculation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Customer Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <Input placeholder="Enter customer name" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input placeholder="+92 xxx xxxxxxx" />
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Invoice Items</Label>
                  <Button size="sm" variant="outline" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-sm font-medium">Item</th>
                        <th className="px-3 py-2 text-left text-sm font-medium">Qty</th>
                        <th className="px-3 py-2 text-left text-sm font-medium">Rate</th>
                        <th className="px-3 py-2 text-left text-sm font-medium">Amount</th>
                        <th className="px-3 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-2">
                            <Input placeholder="Item name" className="h-8" />
                          </td>
                          <td className="px-3 py-2">
                            <Input type="number" placeholder="0" className="h-8 w-20" />
                          </td>
                          <td className="px-3 py-2">
                            <Input type="number" placeholder="0" className="h-8 w-24" />
                          </td>
                          <td className="px-3 py-2 font-medium">PKR 0</td>
                          <td className="px-3 py-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              disabled={items.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="vat" checked={applyVAT} onCheckedChange={(checked) => setApplyVAT(checked as boolean)} />
                <label htmlFor="vat" className="text-sm font-medium cursor-pointer">
                  Apply VAT Margin (17%)
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                </div>
                {applyVAT && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (17%):</span>
                    <span className="font-medium">PKR {vat.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">PKR {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={handleGenerateInvoice}>
                  Generate Invoice
                </Button>
                <Button className="w-full" variant="outline" onClick={handleSendWhatsApp}>
                  <Send className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;

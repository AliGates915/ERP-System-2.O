import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const companies = [
  { id: 1, name: "Afaq Distribution", role: "Admin" },
  { id: 2, name: "FBR Distribution", role: "Accountant" },
  { id: 3, name: "Karachi Traders", role: "Manager" },
];

const CompanySelection = () => {
  const navigate = useNavigate();

  const selectCompany = (company) => {
    toast.success(`Switched to ${company.name}`);
    localStorage.setItem("selectedCompany", JSON.stringify(company));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Select Company</h1>
          <p className="text-muted-foreground">Choose a company to access</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {companies.map((company) => (
            <Card 
              key={company.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 hover:border-primary"
              onClick={() => selectCompany(company)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={company.role === "Admin" ? "default" : "secondary"}>
                    {company.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{company.name}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>Access dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySelection;

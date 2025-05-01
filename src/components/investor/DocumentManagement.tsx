
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data for documents
const mockDocuments = [
  { id: 1, name: "Investment Contract.pdf", type: "Contract", date: "2025-01-15", size: "2.4 MB", url: "/documents/investment-contract.pdf" },
  { id: 2, name: "Q1 Financial Report.pdf", type: "Report", date: "2025-04-05", size: "3.7 MB", url: "/documents/q1-financial-report.pdf" },
  { id: 3, name: "Term Sheet.pdf", type: "Agreement", date: "2025-01-10", size: "1.2 MB", url: "/documents/term-sheet.pdf" },
];

const DocumentManagement = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // In a real app, this would send the file to a server
      toast({
        title: "Document Uploaded",
        description: `${selectedFile.name} has been successfully uploaded.`,
      });
      setSelectedFile(null);
    }
  };

  const handleDownload = (documentItem: typeof mockDocuments[0]) => {
    // Create a download link for the document
    const link = documentItem.url;
    
    // In a real application with actual files, we would use:
    // const link = documentItem.url;
    
    // For this demo, we'll create a text file with mock content
    const content = `This is a mock ${documentItem.type.toLowerCase()} document: ${documentItem.name}
Generated for demo purposes on: ${new Date().toLocaleString()}
File size would be: ${documentItem.size}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary anchor element and trigger download
    const a = window.document.createElement('a');
    a.href = url;
    a.download = documentItem.name;
    window.document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    window.document.body.removeChild(a);

    toast({
      title: "Download Started",
      description: `${documentItem.name} is being downloaded.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>View and download important documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Size</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map(doc => (
                <TableRow key={doc.id} className="border-gray-800">
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownload(doc)}
                      className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>Share documents with NOISAI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-gray-400">Select File</Label>
              <Input 
                id="file" 
                type="file" 
                onChange={handleFileChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentType" className="text-gray-400">Document Type</Label>
              <select 
                id="documentType" 
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option>Contract</option>
                <option>ID Verification</option>
                <option>Tax Document</option>
                <option>Other</option>
              </select>
            </div>
            <Button 
              onClick={handleFileUpload}
              disabled={!selectedFile}
              className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
            >
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagement;

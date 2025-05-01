
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface ConfirmationDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  isSubmitting: boolean;
  onConfirm: () => Promise<void>;
  formValues: {
    amount: string;
    tokenType: string;
  };
}

const ConfirmationDialog = ({
  showDialog,
  setShowDialog,
  isSubmitting,
  onConfirm,
  formValues
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="bg-gray-900 text-white border border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Confirm Investment</DialogTitle>
          <DialogDescription className="text-gray-400">
            You're about to make an investment using MetaMask on the Sepolia network.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span className="font-semibold text-white">${Number(formValues.amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Token:</span>
            <span className="font-semibold text-white">ETH (Sepolia)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network:</span>
            <span className="font-semibold text-green-500">Sepolia Testnet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">ETH Amount:</span>
            <span className="font-semibold text-white">≈ {(Number(formValues.amount) / 2000).toFixed(6)} ETH</span>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => setShowDialog(false)}
            className="text-gray-400 border-gray-800 hover:bg-gray-800"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : "Confirm & Sign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

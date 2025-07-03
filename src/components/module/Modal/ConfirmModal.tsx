import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ConfirmModal({
  confirmModal,
  setConfirmModal,
  handleConfirm,
}: {
  handleConfirm: () => void;
  confirmModal: boolean;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleYes = () => {
    handleConfirm();
  };
  const handleNo = () => {
    setConfirmModal(true);
  };

  return (
    <Dialog open={confirmModal} onOpenChange={setConfirmModal}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Are You Sure</DialogTitle>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleNo}>
              No
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleYes} type="button" variant="secondary">
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

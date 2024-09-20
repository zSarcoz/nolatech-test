import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import useNolaStore from '@/app/(pages)/(store)/nolaStore';

interface DeleteEvaluationModalProps {
  open: boolean;
  onClose: () => void;
  evaluationId: number | undefined;
}

const DeleteEvaluationModal: React.FC<DeleteEvaluationModalProps> = ({
  open,
  onClose,
  evaluationId,
}) => {
  const deleteEvaluation = useNolaStore((state) => state.deleteEvaluation);

  const handleDelete = () => {
    if (evaluationId !== undefined) {
      deleteEvaluation(evaluationId);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Eliminar Evaluacion</DialogTitle>
      <DialogContent>
        <Typography id="delete-dialog-description">
          Estas seguro que deseas eliminar esta evaluacion? No se podra deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='text-primary font-roboto'>
          Cancelar
        </Button>
        <Button onClick={handleDelete} sx={{backgroundColor:"red", color:"white"}}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEvaluationModal;
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormTextField from "./FormTextField";
import ButtonGeneric from "./ButtonGeneric";

function DialogImageUrl({ open, onClose, imageURL, onImageURLChange, onSave }) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "50%",
        },
      }}
      disableRestoreFocus
    >
      <DialogTitle>Update Image URL</DialogTitle>
      <DialogContent>
        <FormTextField
          autoFocus
          margin="dense"
          id="image-url"
          label="Image URL"
          type="url"
          fullWidth
          value={imageURL}
          onChange={onImageURLChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Cancel
        </Button>
        <ButtonGeneric label="Save" onClick={onSave} />
      </DialogActions>
    </Dialog>
  );
}

export default DialogImageUrl;

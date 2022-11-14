import { Box, ImageList, ImageListItem, Modal } from "@mui/material";

interface IProps {
  dogImages: string[];
  open: boolean;
  onClose: (event: Event) => void;
}

function DogPosterModal(props: IProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 12,
    p: 0,
  };

  const imageListStyle = {
    width: "80%",
    height: 450,
    margin: "30px auto 10px auto",
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ImageList sx={imageListStyle} cols={4} rowHeight={150}>
          {props.dogImages.map((image: string) => (
            <ImageListItem key={image}>
              <img
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Modal>
  );
}

export default DogPosterModal;

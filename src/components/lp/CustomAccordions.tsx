import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
} from "@mui/material";

export const CustomAccordion = ({ children, ...props }: AccordionProps) => {
  return (
    <Accordion
      style={{
        background: "transparent",
        boxShadow: "none",
        justifyContent: "center",
        borderRadius: 0,
        marginBottom: "2rem",
      }}
      {...props}
    >
      {children}
    </Accordion>
  );
};

export const CustomAccordionSummary = ({
  children,
  ...props
}: AccordionSummaryProps) => {
  return (
    <AccordionSummary
      expandIcon={
        <ExpandMore fontSize="large" sx={{ color: "common.black" }} />
      }
      aria-controls="panel1a-content"
      id="panel1a-header"
      style={{
        borderBottom: "1.5px solid",
      }}
      {...props}
    >
      {children}
    </AccordionSummary>
  );
};

export const CustomAccordionDetails = ({
  children,
  ...props
}: AccordionDetailsProps) => {
  return (
    <AccordionDetails
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      {...props}
    >
      {children}
    </AccordionDetails>
  );
};

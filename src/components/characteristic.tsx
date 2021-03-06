import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.divider}`,

    "&:last-child": {
      border: "none",
    },
  },
}));

type RocketInfoItemProps = {
  label: string;
  value: string | number;
  unit?: string | null;
  link?: string;
};

const Characteristic: React.FC<RocketInfoItemProps> = ({
  label,
  value,
  unit,
  link,
}: RocketInfoItemProps) => {
  const { container } = useStyles();
  return (
    <div className={container}>
      <Typography
        component="p"
        variant="body1"
        color="textSecondary"
        style={{ marginRight: "16px" }}
      >
        {label}
      </Typography>

      {link ? (
        <Link href={link} color="secondary" target="_blank">
          <Typography component="p" variant="body1">
            {value} {unit ? unit : ""}
          </Typography>
        </Link>
      ) : (
        <Typography component="p" variant="body1" align="right">
          {value} {unit ? unit : ""}
        </Typography>
      )}
    </div>
  );
};

export default Characteristic;

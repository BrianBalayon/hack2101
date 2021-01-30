import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
   root: {},
   card: {
      height: "100%",
      width: "85%",
      margin: "auto",
      padding: theme.spacing(3),
   },
}));

const TokenCard = ({ className, token }) => {
   const classes = useStyles();

   return (
      <Card className={clsx(className, classes.card)} elevation={3}>
         <CardContent>
            <Typography variant={"h2"}>
               {token.name}
            </Typography>
            <Typography variant={"body1"}>{token.balance} {token.symbol}</Typography>
         </CardContent>
      </Card>
   );
};

TokenCard.propTypes = {
   className: PropTypes.string,
   token: PropTypes.object,
};

TokenCard.defaultProps = {
   className: "",
   token: {},
};

export default TokenCard;

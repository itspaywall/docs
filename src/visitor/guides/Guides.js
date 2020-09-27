import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReactMarkdown from "react-markdown";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}> {children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 24,
        borderRadius: 0,
        justifyContent: "space-evenly",
    },
    details: {
        flexDirection: "column",
        padding: 0,
    },
    tabs: {
        margin: 0,
        paddingTop: 24,
    },
    tab: {
        alignItems: "flex-start",
        margin: 0,
    },
    panel: {
        margin: 0,
    },
}));

const accounts = [
    {
        label: "Create Account",
        markdown: "/guides/accounts/create-account.md",
        link: "/guides/accounts/create-account",
    },
    {
        label: "Edit Account",
        markdown: "/guides/accounts/edit-account.md",
        link: "/guides/accounts/edit-account",
    },
    {
        label: "Delete Account",
        markdown: "/guides/accounts/delete-account.md",
        link: "/guides/accounts/delete-account",
    },
];

const subscriptions = [
    {
        label: "Create Subscription",
        markdown: "/guides/subscriptions/create-subscription.md",
        link: "/guides/subscriptions/create-subscription",
    },
    {
        label: "Edit Subscription",
        markdown: "/guides/subscriptions/edit-subscription.md",
        link: "/guides/subscriptions/edit-subscription",
    },
    {
        label: "Delete Subscription",
        markdown: "/guides/subscriptions/delete-subscription.md",
        link: "/guides/subscriptions/delete-subscription",
    },
];

const transactions = [
    {
        label: "Create Transactions",
        markdown: "/guides/transactions/create-transaction.md",
        link: "/guides/transactions/create-transaction",
    },
    {
        label: "Edit Transactions",
        markdown: "/guides/transactions/edit-transaction.md",
        link: "/guides/transactions/edit-transaction",
    },
    {
        label: "Delete Transactions",
        markdown: "/guides/transactions/delete-transaction.md",
        link: "/guides/transactions/delete-transaction",
    },
];

const plans = [
    {
        label: "Create Plans",
        markdown: "/guides/plans/create-plan.md",
        link: "/guides/plans/create-plan",
    },
    {
        label: "Edit Plans",
        markdown: "/guides/plans/edit-plan.md",
        link: "/guides/plans/edit-plan",
    },
    {
        label: "Delete Plans",
        markdown: "/guides/plans/delete-plan.md",
        link: "/guides/plans/delete-plan",
    },
];

const invoices = [
    {
        label: "Create Invoice",
        markdown: "/guides/invoices/create-invoice.md",
        link: "/guides/invoices/create-invoice",
    },
    {
        label: "Edit Invoice",
        markdown: "/guides/invoices/edit-invoice.md",
        link: "/guides/invoices/edit-invoice",
    },
    {
        label: "Delete Invoice",
        markdown: "/guides/invoices/delete-invoice.md",
        link: "/guides/invoices/delete-invoice",
    },
];

function Guide(Page) {
    const history = useHistory();
    const [markdown, setMarkdown] = React.useState("");
    const classes = useStyles();
    const [tabIndex, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        load(Page[newValue].markdown);
        history.push(Page[newValue].link);
    };

    async function load(file) {
        const response = await fetch(file);
        const text = await response.text();
        setMarkdown(text);
    }

    useEffect(() => {
        load(Page[0].markdown);
    }, []);

    return (
        <Grid container={true}>
            <Grid item={true} xs={12} md={2}>
                <Card variant="outlined" className={classes.card}>
                    <CardContent className={classes.details}>
                        <Tabs
                            orientation="vertical"
                            variant="fullWidth"
                            value={tabIndex}
                            onChange={handleChange}
                            className={classes.tabs}
                        >
                            {Page.map((feature) => (
                                <Tab label={feature.label} />
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item={true} xs={12} md={10}>
                <TabPanel value={tabIndex} index={0}>
                    <ReactMarkdown source={markdown} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ReactMarkdown source={markdown} />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <ReactMarkdown source={markdown} />
                </TabPanel>
            </Grid>
        </Grid>
    );
}

const routes = [
    {
        path: "/guides/accounts",
        component: React.lazy(() => Guide(accounts)),
    },
    {
        path: "/guides/subscriptions",
        component: React.lazy(() => Guide(subscriptions)),
    },
    {
        path: "/guides/transactions",
        component: React.lazy(() => Guide(transactions)),
    },
    {
        path: "/guides/plans",
        component: React.lazy(() => Guide(plans)),
    },
    {
        path: "/guides/invoices",
        component: React.lazy(() => Guide(invoices)),
    },
];

function Guides() {
    return <div>{renderRoutes(routes)}</div>;
}

export default withRouter(Guides);

import React, { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

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

const guides = [
    {
        id: "accounts",
        markdownURL: "/guides/accounts/accounts.md",
        sections: [
            {
                label: "Create Account",
                markdownURL: "/guides/accounts/create-account.md",
                id: "create-account",
            },
            {
                label: "Edit Account",
                markdownURL: "/guides/accounts/edit-account.md",
                id: "edit-account",
            },
            {
                label: "Delete Account",
                markdownURL: "/guides/accounts/delete-account.md",
                id: "delete-account",
            },
        ],
    },
    {
        id: "subscriptions",
        markdownURL: "/guides/subscriptions/subscriptions.md",
        sections: [
            {
                label: "Create Subscription",
                markdownURL: "/guides/subscriptions/create-subscription.md",
                id: "create-subscription",
            },
            {
                label: "Edit Subscription",
                markdownURL: "/guides/subscriptions/edit-subscription.md",
                id: "edit-subscription",
            },
            {
                label: "Delete Subscription",
                markdownURL: "/guides/subscriptions/delete-subscription.md",
                id: "delete-subscription",
            },
        ],
    },
    {
        id: "transactions",
        markdownURL: "/guides/transactions/transactions.md",
        sections: [
            {
                label: "Create Transactions",
                markdownURL: "/guides/transactions/create-transaction.md",
                id: "create-transaction",
            },
            {
                label: "Edit Transactions",
                markdownURL: "/guides/transactions/edit-transaction.md",
                id: "edit-transaction",
            },
            {
                label: "Delete Transactions",
                markdownURL: "/guides/transactions/delete-transaction.md",
                id: "delete-transaction",
            },
        ],
    },
    {
        id: "plans",
        markdownURL: "/guides/plans/plans.md",
        sections: [
            {
                label: "Create Plans",
                markdownURL: "/guides/plans/create-plan.md",
                id: "create-plan",
            },
            {
                label: "Edit Plans",
                markdownURL: "/guides/plans/edit-plan.md",
                id: "edit-plan",
            },
            {
                label: "Delete Plans",
                markdownURL: "/guides/plans/delete-plan.md",
                id: "delete-plan",
            },
        ],
    },
    {
        id: "invoices",
        markdownURL: "/guides/invoices/invoices.md",
        sections: [
            {
                label: "Create Invoice",
                markdownURL: "/guides/invoices/create-invoice.md",
                id: "create-invoice",
            },
            {
                label: "Edit Invoice",
                markdownURL: "/guides/invoices/edit-invoice.md",
                id: "edit-invoice",
            },
            {
                label: "Delete Invoice",
                markdownURL: "/guides/invoices/delete-invoice.md",
                id: "delete-invoice",
            },
        ],
    },
];

function Guides(props) {
    const history = useHistory();
    const classes = useStyles();
    const [tabIndex, setTabIndex] = React.useState(-1);
    const { fetchMarkdown, markdown } = props;
    const { guide: guideId, section: sectionId } = useParams();

    const guide = guides.find((guide) => guide.id === guideId);
    let sectionIndex = -1;
    if (guide) {
        if (sectionId) {
            sectionIndex = guide.sections.findIndex(
                (section) => section.id === sectionId
            );
        }
    }

    const guideMarkdownURL = guide ? guide.markdownURL : null;
    const guideSections = guide ? guide.sections : null;

    useEffect(() => {
        if (guideId && guide) {
            if (sectionIndex >= 0) {
                setTabIndex(sectionIndex);
                fetchMarkdown(guide.sections[sectionIndex].markdownURL);
            } else {
                fetchMarkdown(guideMarkdownURL);
            }
        }
    }, [
        guideId,
        sectionId,
        sectionIndex,
        setTabIndex,
        fetchMarkdown,
        guide,
        guideMarkdownURL,
        guideSections,
    ]);

    if (!guide || (sectionId && sectionIndex < 0)) {
        return <Redirect to="/error/404" />;
    }

    const handleTabChange = (event, newTabIndex) => {
        const section = guide.sections[newTabIndex];
        history.push(`/guides/${guide.id}/${section.id}`);
    };

    return (
        <React.Fragment>
            {markdown && (
                <Grid container={true}>
                    <Grid item={true} xs={12} md={2}>
                        <Card variant="outlined" className={classes.card}>
                            <CardContent className={classes.details}>
                                <Tabs
                                    orientation="vertical"
                                    variant="fullWidth"
                                    value={tabIndex}
                                    onChange={handleTabChange}
                                    className={classes.tabs}
                                >
                                    {guide.sections.map((section) => (
                                        <Tab label={section.label} />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} md={10}>
                        {guide.sections.map((section, index) => (
                            <TabPanel value={tabIndex} index={index}>
                                {tabIndex === index && (
                                    <ReactMarkdown source={markdown} />
                                )}
                            </TabPanel>
                        ))}
                        {tabIndex === -1 && <ReactMarkdown source={markdown} />}
                    </Grid>
                </Grid>
            )}
            {!markdown && "Loading..."}
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        markdown: state.markdown,
    };
}

const mapDispatchToProps = {
    fetchMarkdown: actions.fetchMarkdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guides);

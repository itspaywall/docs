import React, { useState } from "react";
import {
    AppBar,
    Button,
    Toolbar,
    makeStyles,
    Typography,
    Menu,
    MenuItem,
    Box,
    Grid,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import clsx from "clsx";

import AccountsIcon from "@material-ui/icons/AccountCircle";
import TransactionsIcon from "@material-ui/icons/MonetizationOn";
import SubscriptionsIcon from "@material-ui/icons/Autorenew";
import InvoicesIcon from "@material-ui/icons/Receipt";
import PlansIcon from "@material-ui/icons/LocalOffer";

const useStyles = makeStyles((theme) => ({
    logoButton: {
        height: 64,
        width: 160,
        borderRadius: 0,
    },
    appBar: {
        margin: 0,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: theme.palette.primary,
        background: "white",
    },
    button: {
        padding: 16,
        borderRadius: 0,
    },
    action: {
        paddingLeft: 16,
        paddingRight: 16,
        marginRight: 16,
        borderRadius: 0,
    },
    menuItem: {
        display: "inline-block",
        width: 450,
        margin: 0,
        padding: 16,
    },
    guideMenu: {
        width: 900,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 8,
    },
    itemTitle: {
        fontSize: 14,
    },
    itemSubtitle: {
        display: "block",
        fontSize: 12,
    },
    outer: {
        display: "flex",
    },
    inner: {
        width: "90%",
        margin: 0,
        marginLeft: 12,
    },
}));

const links = [
    {
        id: "apiReference",
        title: "API REFERENCE",
        url: "/api",
    },
];

const guides = [
    {
        title: "ACCOUNTS",
        icon: <AccountsIcon />,
        description:
            "Manage your accounts effortlessly. Read guides on creating, updating and deleting accounts.",
        link: `/guides/accounts`,
    },
    {
        title: "SUBSCRIPTIONS",
        icon: <SubscriptionsIcon />,
        description:
            "Manage your subscriptions effortlessly. Read guides on creating, updating and deleting subscriptions.",
        link: `/guides/subscriptions`,
    },
    {
        title: "TRANSACTIONS",
        icon: <TransactionsIcon />,
        description:
            "Manage your transactions effortlessly. Read guides on creating, updating and deleting transactions.",
        link: `/guides/transactions`,
    },
    {
        title: "PLANS",
        icon: <PlansIcon />,
        description:
            "Manage your plans effortlessly. Read guides on creating, updating and deleting plans.",
        link: `/guides/plans`,
    },
    {
        title: "INVOICES",
        icon: <InvoicesIcon />,
        description:
            "Manage your invoices effortlessly. Read guides on creating, updating and deleting invoices.",
        external: true,
        link: `/guides/invoices`,
    },
];

function MainToolbar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [guideMenuAnchor, setGuideMenuAnchor] = useState(null);
    const handleLink = (url) => () => history.push(url);
    const handleExternalLink = (url) => () => (window.location = url);

    const handleGuideMenuClose = () => {
        setGuideMenuAnchor(null);
    };

    const handleGuideMenuClick = (url) => () => {
        history.push(url);
        handleGuideMenuClose();
    };

    const renderMenu = () => (
        <Menu
            anchorEl={guideMenuAnchor}
            open={guideMenuAnchor !== null}
            onClose={handleGuideMenuClose}
            className={classes.menu}
        >
            <Grid container={true} className={classes.guideMenu}>
                {guides.map((guide) => (
                    <Grid item={true} xs={6}>
                        <MenuItem
                            onClick={handleGuideMenuClick(guide.link)}
                            className={classes.menuItem}
                        >
                            <div className={classes.outer}>
                                {guide.icon}
                                <div className={classes.inner}>
                                    <Typography className={classes.itemTitle}>
                                        {guide.title}
                                    </Typography>
                                    <Typography
                                        noWrap={true}
                                        className={classes.itemSubtitle}
                                    >
                                        {guide.description}
                                    </Typography>
                                </div>
                            </div>
                        </MenuItem>
                    </Grid>
                ))}
            </Grid>
        </Menu>
    );

    return (
        <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                <Box display="flex" flexGrow={1}>
                    <Button
                        className={classes.logoButton}
                        onClick={handleExternalLink(
                            `${process.env.REACT_APP_WEBSITE_URL} / index`
                        )}
                    >
                        <img
                            src="assets/images/hubble.png"
                            alt="Hubble logo"
                            height="40px"
                        />
                    </Button>
                    {links.map((item) => (
                        <Button
                            key={item.id}
                            onClick={handleLink(item.url)}
                            className={classes.button}
                        >
                            {item.title}
                        </Button>
                    ))}
                    <Button
                        onClick={(event) => setGuideMenuAnchor(event.target)}
                        className={classes.button}
                    >
                        GUIDES
                    </Button>
                </Box>
                <Button
                    className={classes.action}
                    onClick={handleExternalLink(
                        `${process.env.REACT_APP_WEBSITE_URL} / login`
                    )}
                >
                    LOGIN
                </Button>
                <Button
                    className={classes.action}
                    color="primary"
                    variant="contained"
                    onClick={handleExternalLink(
                        `${process.env.REACT_APP_WEBSITE_URL} / register`
                    )}
                >
                    TRY FOR FREE
                </Button>
            </Toolbar>
            {renderMenu()}
        </AppBar>
    );
}

export default withRouter(MainToolbar);

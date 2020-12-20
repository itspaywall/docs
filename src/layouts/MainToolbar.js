/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        fontSize: 14,
        whiteSpace: "normal",
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
            "Accounts represent your customer. The accounts dashboard is core to managing your customers. ",
        link: `/guides/accounts`,
    },
    {
        title: "SUBSCRIPTIONS",
        icon: <SubscriptionsIcon />,
        description:
            "Subscriptions are created when your customers subscribe to one of your plans.",
        link: `/guides/subscriptions`,
    },
    {
        title: "TRANSACTIONS",
        icon: <TransactionsIcon />,
        description:
            "Transactions are created when a credit, debit or cash payment is made by your customer.",
        link: `/guides/transactions`,
    },
    {
        title: "PLANS",
        icon: <PlansIcon />,
        description:
            "A plan is a blueprint for a subscription. It tells Hubble how often and how much to charge your subscribers. ",
        link: `/guides/plans`,
    },
    {
        title: "INVOICES",
        icon: <InvoicesIcon />,
        description:
            "All billing events create an invoice automatically. The invoice relates a subscription with a transaction.",
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
                                        className={classes.itemSubtitle}
                                        paragraph={true}
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

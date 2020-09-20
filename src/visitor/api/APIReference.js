import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import ReactMarkdown from "react-markdown";

import pages from "./content.json";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 80,
    },
    pageTitle: {
        marginBottom: 8,
        fontWeight: 600,
        fontSize: 32,
    },
    snippets: {
        padding: 8,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        marginBottom: 8,
        fontWeight: 600,
    },
    snippet: {},
    snippetHeader: {
        display: "flex",
        alignItems: "center",
        background: grey[800],
        padding: 12,
        borderRadius: "6px 6px 0px 0px",
    },
    snippetTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: 600,
        width: "90%",
    },
    snippetContent: {
        background: grey[700],
        color: "white",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Courier New",
        borderRadius: "0px 0px 6px 6px",
        overflow: "auto",
        whiteSpace: "nowrap",
        width: "100%",
        margin: 0,
        "& code": {
            fontFamily: "Courier Prime",
        },
        "& a": {
            color: "white",
        },
    },
    copy: {
        color: "white",
    },
    language: {
        color: "white",
        width: 130,
        paddingLeft: 8,
        paddingRight: 8,
    },
    markdown: {
        fontSize: 16,
        "& code": {
            fontFamily: "Courier Prime",
            background: grey[200],
            fontSize: 14,
            padding: 4,
        },
        "& a": {
            color: "white",
        },
        "& p": {
            marginTop: 0,
            marginBottom: 16,
        },
    },
    formatTitle: {
        fontSize: 18,
        fontWeight: 600,
    },
    formatItemHeader: {
        display: "flex",
    },
    formatItemName: {
        fontSize: 16,
        fontWeight: 600,
        marginTop: 8,
        marginBottom: 4,
        fontFamily: "Courier Prime",
    },
    formatItemType: {
        background: grey[600],
        color: "white",
        fontSize: 12,
        padding: "4px 12px 0px 12px",
        fontWeight: 600,
        marginTop: 8,
        marginBottom: 4,
        fontFamily: "Courier Prime",
        borderRadius: 12,
        marginLeft: 8,
    },
}));

const languages = [
    {
        id: "curl",
        title: "cURL",
    },
    {
        id: "javascript",
        title: "JavaScript",
    },
];

function Pricing(props) {
    const [languageAnchor, setLanguageAnchor] = React.useState(null);
    const [language, setLanguage] = React.useState(languages[0]);
    const classes = useStyles();

    const handleClick = (event) => {
        setLanguageAnchor(event.currentTarget);
    };

    const handleLanguage = (language) => () => {
        setLanguage(language);
        setLanguageAnchor(null);
    };

    useEffect(() => {
        document.title = "API Reference | Hubble Subscriptions";
    }, []);

    const renderPageStart = (page) => (
        <Grid container={true} className={classes.page} spacing={3}>
            <Grid item={true} xs={12} lg={6}>
                <Typography variant="h2" className={classes.pageTitle}>
                    {page.title}
                </Typography>
                <ReactMarkdown
                    className={classes.markdown}
                    escapeHtml={true}
                    source={page.description}
                />
            </Grid>
            {page.snippetContent && (
                <Grid item={true} xs={12} lg={6} className={classes.snippets}>
                    <div className={classes.snippetHeader}>
                        <Typography
                            variant="h5"
                            className={classes.snippetTitle}
                        >
                            {page.snippetTitle}
                        </Typography>
                        <Button size="small" className={classes.copy}>
                            Copy
                        </Button>
                    </div>
                    <ReactMarkdown
                        source={page.snippetContent}
                        className={classes.snippetContent}
                    />
                </Grid>
            )}
        </Grid>
    );

    const renderSnippet = (section) => {
        let snippet;
        if (section.generalSnippet) {
            snippet = section.snippets[0];
        } else {
            snippet = section.snippets.find(
                (snippet) => snippet.language === language.id
            );
        }

        return (
            <ReactMarkdown
                source={snippet ? snippet.content : "No content"}
                className={classes.snippetContent}
            />
        );
    };

    return (
        <Container className={classes.root}>
            {pages.map((page) => (
                <React.Fragment>
                    {renderPageStart(page)}
                    {page.sections.map((section) => (
                        <Grid
                            container={true}
                            className={classes.section}
                            spacing={3}
                        >
                            <Grid item={true} xs={12} lg={6}>
                                <Typography
                                    variant="h5"
                                    className={classes.sectionTitle}
                                >
                                    {section.title}
                                </Typography>
                                <ReactMarkdown
                                    className={classes.markdown}
                                    escapeHtml={true}
                                    source={section.content}
                                />
                                {section.formats &&
                                    section.formats.map((format) => (
                                        <React.Fragment>
                                            <Typography
                                                variant="h5"
                                                className={classes.formatTitle}
                                            >
                                                {format.title}
                                            </Typography>
                                            {format.description && (
                                                <ReactMarkdown
                                                    className={classes.markdown}
                                                    escapeHtml={true}
                                                    source={format.description}
                                                />
                                            )}
                                            {format.items.map((item) => (
                                                <div>
                                                    <div
                                                        className={
                                                            classes.formatItemHeader
                                                        }
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            className={
                                                                classes.formatItemName
                                                            }
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="h6"
                                                            className={
                                                                classes.formatItemType
                                                            }
                                                        >
                                                            {item.type}
                                                        </Typography>
                                                    </div>
                                                    <ReactMarkdown
                                                        className={
                                                            classes.markdown
                                                        }
                                                        escapeHtml={true}
                                                        source={
                                                            item.description
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                            </Grid>
                            {section.snippets && (
                                <Grid
                                    item={true}
                                    xs={12}
                                    lg={6}
                                    className={classes.snippets}
                                >
                                    <div className={classes.snippetHeader}>
                                        <Typography
                                            variant="h5"
                                            className={classes.snippetTitle}
                                        >
                                            {section.snippetTitle}
                                        </Typography>
                                        {section.generalSnippet || (
                                            <Button
                                                onClick={handleClick}
                                                className={classes.language}
                                                endIcon={<DownIcon />}
                                            >
                                                {language.title}
                                            </Button>
                                        )}
                                        <Button
                                            size="small"
                                            className={classes.copy}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                    {renderSnippet(section)}
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
            <Menu
                anchorEl={languageAnchor}
                keepMounted={true}
                open={Boolean(languageAnchor)}
                onClose={() => setLanguageAnchor(null)}
            >
                {languages.map((language) => (
                    <MenuItem onClick={handleLanguage(language)}>
                        {language.title}
                    </MenuItem>
                ))}
            </Menu>
        </Container>
    );
}

export default Pricing;

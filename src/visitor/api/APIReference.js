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

import sections from "./content.json";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 80,
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
        padding: 16,
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Courier New",
        borderRadius: "0px 0px 6px 6px",
        overflow: "auto",
        whiteSpace: "nowrap",
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
            <Typography variant="h5" className={classes.snippetContent}>
                {snippet && snippet.content}
                {!snippet && "No content"}
            </Typography>
        );
    };

    useEffect(() => {
        document.title = "API Reference | Hubble Subscriptions";
    }, []);

    return (
        <Container className={classes.root}>
            {sections.map((section) => (
                <Grid container={true} className={classes.section} spacing={3}>
                    <Grid item={true} xs={12} lg={6}>
                        <Typography
                            variant="h5"
                            className={classes.sectionTitle}
                        >
                            {section.title}
                        </Typography>
                        {section.paragraphs.map((paragraph) => (
                            <Typography paragraph={true}>
                                {paragraph}
                            </Typography>
                        ))}
                    </Grid>
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
                            <Button size="small" className={classes.copy}>
                                Copy
                            </Button>
                        </div>
                        {renderSnippet(section)}
                    </Grid>
                </Grid>
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

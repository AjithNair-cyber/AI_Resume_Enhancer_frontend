import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  horizontalRuleSection: {
    backgroundColor: "black",
    height: 0.2,
    marginVertical: 0.5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  job_role: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 10,
    textAlign: "left",
  },
  companyExperience: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dateStyle: {
    fontSize: 9,
    color: "#808080",
    marginBottom: 1,
  },
  listStyle: {
    fontSize: 10,
    marginBottom: 1,
  },
  sectionMargin: {
    marginTop: 20,
  },
  sectionMarginList: {
    marginTop: 15,
  },
  sectionListMargin: {
    marginBottom: 5,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gridContainerHeader: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginTop: 10,
  },
  gridItem: {
    width: "23%",
    marginBottom: 5,
  },
  gridItemHeader: {
    width: "48%",
    fontSize: 10,
    color: "#808080",
  },
});

const ResumeTemplate = (props: ResumeData) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.job_role}>{props.job_role}</Text>
        <View style={styles.gridContainerHeader}>
          {props.email && (
            <Text style={styles.gridItemHeader}>Email: {props.email}</Text>
          )}
          {props.linkedin && (
            <Text style={styles.gridItemHeader}>
              Linkedin: {props.linkedin}
            </Text>
          )}
          {props.github && (
            <Text style={styles.gridItemHeader}>GitHub: {props.github}</Text>
          )}
          {props.mobile && (
            <Text style={styles.gridItemHeader}>Phone: {props.mobile}</Text>
          )}
        </View>
        <View>
          <Text style={styles.sectionHeader}>Summary</Text>
          <View style={styles.horizontalRuleSection} />
          <Text style={styles.sectionText}>{props.professional_summary}</Text>
        </View>
        {props.experience.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Experience</Text>
            <View style={styles.horizontalRuleSection} />
            {props.experience.map((exp, index) => (
              <View key={index} style={styles.sectionListMargin}>
                <Text style={styles.companyExperience}>
                  {exp.title} at {exp.company}
                </Text>
                <Text style={styles.dateStyle}>
                  {exp.start_date}/{exp.end_date}
                </Text>
                {exp.description.map((desc, descIndex) => (
                  <Text key={descIndex} style={styles.listStyle}>
                    {` • ${desc}`}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
        {props.key_skills.length > 0 && (
          <View style={styles.sectionMarginList}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <View style={styles.horizontalRuleSection} />
            <View style={styles.gridContainer}>
              {props.key_skills.map((skill, index) => (
                <View key={index} style={styles.gridItem}>
                  <Text style={styles.sectionText}>• {skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {props.education.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Education</Text>
            <View style={styles.horizontalRuleSection} />
            {props.education.map((edu, index) => (
              <View key={index} style={styles.sectionListMargin} wrap={false}>
                <Text style={styles.companyExperience}>
                  {edu.degree} from {edu.institution}
                </Text>
                <Text style={styles.dateStyle}>
                  {edu.start_date}/{edu.end_date}
                </Text>
                {edu.cgpa && (
                  <Text style={styles.listStyle}>CGPA: {edu.cgpa}</Text>
                )}
                {edu.percentage && (
                  <Text style={styles.listStyle}>
                    Percentage: {edu.percentage}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
        {props.projects.length > 0 && (
          <View style={styles.sectionMarginList}>
            <Text style={styles.sectionHeader}>Projects</Text>
            <View style={styles.horizontalRuleSection} />
            {props.projects.map((project, index) => (
              <View key={index} style={styles.sectionListMargin} wrap={false}>
                <Text style={styles.companyExperience}>{project.title}</Text>
                {Array.isArray(project.description) &&
                  project.description.map((desc, descIndex) => (
                    <Text key={descIndex} style={styles.listStyle}>
                      • {desc}
                    </Text>
                  ))}
                <Text style={styles.listStyle}>
                  Tech Stack : {project.tech_stack}
                </Text>
              </View>
            ))}
          </View>
        )}
        {props.certifications.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Certifications</Text>
            <View style={styles.horizontalRuleSection} />
            {props.certifications.map((certification, index) => (
              <View key={index} style={styles.sectionListMargin}>
                <Text style={styles.companyExperience}>
                  {certification.title}
                </Text>
                <Text style={styles.dateStyle}>
                  {certification.organization} : {certification.start_date}/
                  {certification.end_date}
                </Text>
              </View>
            ))}
          </View>
        )}
        {props.hobbies.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Hobbies</Text>
            <View style={styles.horizontalRuleSection} />
            <View style={styles.gridContainer}>
              {props.hobbies.map((hobby, index) => (
                <View key={index} style={styles.gridItem}>
                  <Text style={styles.sectionText}>• {hobby}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {props.languages.length > 0 && (
          <View style={styles.sectionMargin}>
            <Text style={styles.sectionHeader}>Languages</Text>
            <View style={styles.horizontalRuleSection} />
            <View style={styles.gridContainer}>
              {props.languages.map((lang, index) => (
                <View key={index} style={styles.gridItem}>
                  <Text style={styles.sectionText}>• {lang}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumeTemplate;

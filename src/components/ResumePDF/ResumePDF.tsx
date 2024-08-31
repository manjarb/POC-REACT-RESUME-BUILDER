// src/components/ResumePDF.tsx
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 20,
  },
  mainSection: {
    flex: 2,
    paddingRight: 10,
    backgroundColor: '#f8f8f8',
    color: '#333',
  },
  sidebar: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#b71c1c', // Red background
    color: '#fff',
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: '#d32f2f',
    marginBottom: 5,
  },
  contactInfo: {
    marginTop: 10,
    fontSize: 8,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#d32f2f',
    borderBottom: 1,
    borderBottomColor: '#d32f2f',
    paddingBottom: 3,
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  experienceCompany: {
    fontSize: 9,
    color: '#666',
  },
  experienceDetails: {
    fontSize: 9,
  },
  sidebarSection: {
    marginBottom: 15,
  },
  sidebarTitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 5,
  },
  sidebarItem: {
    fontSize: 9,
    marginBottom: 5,
    lineHeight: 1.5,
  },
});

// Resume Component
const ResumePDF = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      {/* Main Section */}
      <View style={styles.mainSection}>
        <View style={styles.header}>
          <Text
            style={styles.name}
          >{`${data.firstName} ${data.lastName}`}</Text>
          <Text style={styles.title}>
            Senior Recruiter | HR Specialist | CIPD
          </Text>
          <Text style={styles.contactInfo}>
            {data.email} | {data.linkedin} | {data.address}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{data.description}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.experienceCompany}>
                {exp.company}, {exp.location} ({exp.startDate} - {exp.endDate})
              </Text>
              <Text style={styles.experienceDetails}>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>
                {edu.degree} in {edu.major}
              </Text>
              <Text style={styles.experienceCompany}>
                {edu.university}, {edu.location} ({edu.startDate} -{' '}
                {edu.endDate})
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Strengths */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Strengths</Text>
          <Text style={styles.sidebarItem}>
            Effective Communicator: Used excellent communication skills...
          </Text>
          <Text style={styles.sidebarItem}>
            Strategic Sourcer: Identified passive candidates...
          </Text>
          <Text style={styles.sidebarItem}>
            Interview Facilitator: Provided extensive support...
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Skills</Text>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.sidebarItem}>
              {skill.name}
            </Text>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <Text key={index} style={styles.sidebarItem}>
              {cert.name} ({cert.date})
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;

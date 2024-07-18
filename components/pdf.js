"use client";

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import image from "./tiny.png";

export const Invoice = ({ data }) => {
  const subTotal = data.items.reduce((sum, item) => sum + Number(item.price), 0);
  return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.companyName}>TinyLux</Text>
          <Text style={styles.companyDesc}>Baby Gear service and repair</Text>
        </View>
        <Image src={image.src} style={styles.logo} />
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>CONTACT DETAILS</Text>
        <Text style={styles.contactName}>Thilini</Text>
        <Text style={styles.contactDetails}>P : +971 56 821 0027</Text>
        <Text style={styles.contactDetails}>E : Contact@tinylux.ae</Text>
        <Text style={styles.contactDetails}>W : https://tinylux.ae/</Text>
      </View>

      <View style={styles.invoiceDetails}>
        <Text style={styles.invoiceDetailText}>No : {data.invoiceNumber}</Text>
        <Text style={styles.invoiceDetailText}>Date : {data.date}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>SERVICE</Text>
          <Text style={styles.tableHeaderCell}>QTY</Text>
          <Text style={styles.tableHeaderCell}>PRICE</Text>
          <Text style={styles.tableHeaderCell}>TOTAL</Text>
        </View>
        {data.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>AED {item.price}</Text>
            <Text style={styles.tableCell}>AED {item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totals}>
        <Text style={styles.totalLine}>Sub-total : AED {subTotal}</Text>
        <Text style={styles.totalLine}>Dilivery : AED {data.deliveryAmount}</Text>
        <Text style={styles.totalLine}>Total : AED {subTotal + data.deliveryAmount}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for purchase!</Text>
        <Text style={styles.footerSignature}>Thilini</Text>
        <Text style={styles.footerRole}>Administrator</Text>
      </View>
    </Page>
  </Document>
  )
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftHeader: {
    flexDirection: "column",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  companyDesc: {
    fontSize: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactDetails: {
    fontSize: 10,
    marginBottom: 5,
  },
  invoiceDetails: {
    alignSelf: "flex-end",
    fontSize: 10,
    marginBottom: 20,
  },
  invoiceDetailText: {
    marginBottom: 3,
  },
  table: {
    flexDirection: "column",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
  },
  tableHeaderCell: {
    width: "25%",
    fontSize: 10,
  },
  tableCell: {
    width: "25%",
    fontSize: 10,
  },
  totals: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  totalLine: {
    fontSize: 10,
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  footerSignature: {
    fontSize: 10,
    textAlign: "right",
  },
  footerRole: {
    fontSize: 8,
    textAlign: "right",
  },
});
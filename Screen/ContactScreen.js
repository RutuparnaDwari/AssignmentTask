import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, Pressable, Alert, LogBox } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';


const ContactScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        note: "",
        hobby: "",
        sport: "",
    });

    const [products, setProducts] = useState([
        {
            productName: "Chana Dal samhh",
            quantity: 12,
            salePrice: "109",
            discount: "8",
            gstPercent: "7",
            finalPrice: 1288,
            productId: "a64b8ea9-a2c8-4280-ac59-de4f15b0eaa9",
            purchasePrice: "99",
        },
        {
            productName: "Premia Chana Dal",
            quantity: 6,
            salePrice: "100",
            discount: "7",
            gstPercent: "6",
            finalPrice: 592,
            productId: "9c6143fc-9600-4a49-8599-d3f5674b81e0",
            purchasePrice: "90",
        },
        {
            productName: "Satyam Chana Dal",
            quantity: 2,
            salePrice: "104",
            discount: "7",
            gstPercent: "6",
            finalPrice: 206,
            productId: "4552281b-06b0-4a36-88e1-086c594dfd47",
            purchasePrice: "94",
        },
    ]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handlePrint = async (sizeInInches) => {
        try {
            const inchToPx = 203; // 203 DPI is typical for thermal printers
            const widthPx = sizeInInches * inchToPx; // Convert inches to pixels

            const productRows = products.map(item => `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.salePrice}</td>
                    <td>${item.discount}</td>
                    <td>${item.gstPercent}</td>
                    <td>${item.purchasePrice}</td>
                    <td>${item.finalPrice}</td>
                </tr>
            `).join('');

            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 5px;
                                font-size: 10px;
                            }
                            .invoice-container {
                                width: ${widthPx}px;
                                border: 1px solid #000;
                                padding: 5px;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            th, td {
                                border: 1px solid #000;
                                padding: 3px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            <h1>Invoice</h1>
                            <table>
                                <tr>
                                    <th>Name:</th>
                                    <td>${formData.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>${formData.email}</td>
                                </tr>
                                <tr>
                                    <th>Age:</th>
                                    <td>${formData.age}</td>
                                </tr>
                                <tr>
                                    <th>Note:</th>
                                    <td>${formData.note}</td>
                                </tr>
                                <tr>
                                    <th>Hobby:</th>
                                    <td>${formData.hobby}</td>
                                </tr>
                                <tr>
                                    <th>Sport:</th>
                                    <td>${formData.sport}</td>
                                </tr>
                            </table>

                            <h2>Product List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Sale Price</th>
                                        <th>Dis</th>
                                        <th>GST %</th>
                                        <th>Pur Price</th>
                                        <th>Final Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productRows}
                                </tbody>
                            </table>

                            <p>Total: $${products.reduce((acc, item) => acc + item.finalPrice, 0)}</p>
                        </div>
                    </body>
                </html>
            `;

            const { uri: pdfUri } = await Print.printToFileAsync({ html: htmlContent });
            const fileUri = `${FileSystem.documentDirectory}invoice_${sizeInInches}inch.pdf`;

            await FileSystem.moveAsync({
                from: pdfUri,
                to: fileUri,
            });

            Alert.alert("Success", `Invoice PDF generated at ${sizeInInches}-inch width!`);
            await Sharing.shareAsync(fileUri);
        } catch (error) {
            Alert.alert("Error", "Failed to generate invoice.");
            console.error(error);
        }
    };


    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, []);





    const renderProductItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.productName}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.salePrice}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.discount}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.gstPercent}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.purchasePrice}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.finalPrice}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container} >
            {/* Form Section */}
            <Text style={styles.headerText}>Fill the Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={formData.age}
                onChangeText={(value) => handleInputChange("age", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Note"
                value={formData.note}
                onChangeText={(value) => handleInputChange("note", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hobby"
                value={formData.hobby}
                onChangeText={(value) => handleInputChange("hobby", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Sport"
                value={formData.sport}
                onChangeText={(value) => handleInputChange("sport", value)}
            />


            {/* Table Section */}
            <Text style={styles.headerText}>Product List</Text>
            <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Name</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Qty</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Sale P</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Dis</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>GSTP</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Pur P</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>FP</Text>
            </View>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.productId}
            />

            <Pressable onPress={() => handlePrint(2)} style={styles.printButton}>
                <Text style={styles.printText}>Print 2-inch PDF</Text>
            </Pressable>

            <Pressable onPress={() => handlePrint(3)} style={styles.printButton}>
                <Text style={styles.printText}>Print 3-inch PDF</Text>
            </Pressable>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexGrow: 1,
        backgroundColor: "#f8f8f8",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tableHeaderText: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tableCell: {
        textAlign: "center",
        flex: 1,
    },
    saveButton: {
        backgroundColor: '#008000',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 8,
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    printButton: {
        backgroundColor: '#008000',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 8,
    },
    printText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    }
});

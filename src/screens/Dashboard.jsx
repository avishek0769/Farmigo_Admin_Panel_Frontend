import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Mock data for product requests
const mockProductRequests = [
    {
        id: '1',
        productName: 'Organic Tomatoes',
        sellerName: 'John Farm',
        category: 'Vegetables',
        price: '₹45/kg',
        quantity: '100 kg',
        description: 'Fresh organic tomatoes grown without pesticides',
        image: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=T',
        status: 'pending',
        requestDate: '2025-06-07',
        location: 'Punjab, India'
    },
    {
        id: '2',
        productName: 'Fresh Milk',
        sellerName: 'Dairy Plus',
        category: 'Dairy',
        price: '₹60/liter',
        quantity: '500 liters',
        description: 'Pure cow milk from grass-fed cows',
        image: 'https://via.placeholder.com/100x100/4ecdc4/ffffff?text=M',
        status: 'pending',
        requestDate: '2025-06-06',
        location: 'Haryana, India'
    },
    {
        id: '3',
        productName: 'Basmati Rice',
        sellerName: 'Rice Valley',
        category: 'Grains',
        price: '₹120/kg',
        quantity: '200 kg',
        description: 'Premium quality aged basmati rice',
        image: 'https://via.placeholder.com/100x100/45b7d1/ffffff?text=R',
        status: 'approved',
        requestDate: '2025-06-05',
        location: 'Punjab, India'
    },
    {
        id: '4',
        productName: 'Organic Carrots',
        sellerName: 'Green Fields',
        category: 'Vegetables',
        price: '₹35/kg',
        quantity: '150 kg',
        description: 'Crunchy organic carrots rich in vitamins',
        image: 'https://via.placeholder.com/100x100/f39c12/ffffff?text=C',
        status: 'rejected',
        requestDate: '2025-06-04',
        location: 'Uttar Pradesh, India'
    },
    {
        id: '5',
        productName: 'Farm Eggs',
        sellerName: 'Happy Hens',
        category: 'Poultry',
        price: '₹8/piece',
        quantity: '500 pieces',
        description: 'Free-range chicken eggs',
        image: 'https://via.placeholder.com/100x100/e74c3c/ffffff?text=E',
        status: 'pending',
        requestDate: '2025-06-03',
        location: 'Maharashtra, India'
    }
];

const ProductCard = ({ product, onApprove, onReject, onViewDetails }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12';
            case 'approved': return '#27ae60';
            case 'rejected': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <View style={styles.productCard}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.productName}</Text>
                    <Text style={styles.sellerName}>by {product.sellerName}</Text>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.location}>📍 {product.location}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
                        <Text style={styles.statusText}>{getStatusText(product.status)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Text style={styles.description} numberOfLines={2}>
                    {product.description}
                </Text>
                <View style={styles.productDetails}>
                    <Text style={styles.price}>Price: {product.price}</Text>
                    <Text style={styles.quantity}>Qty: {product.quantity}</Text>
                    <Text style={styles.date}>Date: {product.requestDate}</Text>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => onViewDetails(product)}
                >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>

                {product.status === 'pending' && (
                    <>
                        <TouchableOpacity 
                            style={styles.approveButton}
                            onPress={() => onApprove(product.id)}
                        >
                            <Text style={styles.approveButtonText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.rejectButton}
                            onPress={() => onReject(product.id)}
                        >
                            <Text style={styles.rejectButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

export default function Dashboard() {
    const [productRequests, setProductRequests] = useState(mockProductRequests);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

    const handleApprove = (productId) => {
        Alert.alert(
            'Approve Product',
            'Are you sure you want to approve this product for listing?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Approve',
                    onPress: () => {
                        setProductRequests(prev =>
                            prev.map(product =>
                                product.id === productId
                                    ? { ...product, status: 'approved' }
                                    : product
                            )
                        );
                        Alert.alert('Success', 'Product approved successfully!');
                    }
                }
            ]
        );
    };

    const handleReject = (productId) => {
        Alert.alert(
            'Reject Product',
            'Are you sure you want to reject this product request?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reject',
                    style: 'destructive',
                    onPress: () => {
                        setProductRequests(prev =>
                            prev.map(product =>
                                product.id === productId
                                    ? { ...product, status: 'rejected' }
                                    : product
                            )
                        );
                        Alert.alert('Product Rejected', 'Product request has been rejected.');
                    }
                }
            ]
        );
    };

    const handleViewDetails = (product) => {
        Alert.alert(
            product.productName,
            `Seller: ${product.sellerName}\nCategory: ${product.category}\nPrice: ${product.price}\nQuantity: ${product.quantity}\nLocation: ${product.location}\n\nDescription: ${product.description}`,
            [{ text: 'Close' }]
        );
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const getFilteredProducts = () => {
        if (filter === 'all') return productRequests;
        return productRequests.filter(product => product.status === filter);
    };

    const getStatusCounts = () => {
        const pending = productRequests.filter(p => p.status === 'pending').length;
        const approved = productRequests.filter(p => p.status === 'approved').length;
        const rejected = productRequests.filter(p => p.status === 'rejected').length;
        return { pending, approved, rejected };
    };

    const statusCounts = getStatusCounts();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Product Requests</Text>
                <Text style={styles.headerSubtitle}>Manage seller product listings</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{statusCounts.pending}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{statusCounts.approved}</Text>
                    <Text style={styles.statLabel}>Approved</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{statusCounts.rejected}</Text>
                    <Text style={styles.statLabel}>Rejected</Text>
                </View>
            </View>

            <View style={styles.filterContainer}>
                {['all', 'pending', 'approved', 'rejected'].map(status => (
                    <TouchableOpacity
                        key={status}
                        style={[
                            styles.filterButton,
                            filter === status && styles.filterButtonActive
                        ]}
                        onPress={() => setFilter(status)}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            filter === status && styles.filterButtonTextActive
                        ]}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={getFilteredProducts()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onViewDetails={handleViewDetails}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 4,
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#e0e0e0',
    },
    filterButtonActive: {
        backgroundColor: '#27ae60',
    },
    filterButtonText: {
        fontSize: 12,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    filterButtonTextActive: {
        color: '#fff',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    sellerName: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: '#3498db',
        fontWeight: '500',
        marginBottom: 2,
    },
    location: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
    },
    cardBody: {
        padding: 15,
        paddingTop: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        lineHeight: 20,
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#27ae60',
    },
    quantity: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    date: {
        fontSize: 12,
        color: '#95a5a6',
    },
    cardActions: {
        flexDirection: 'row',
        padding: 15,
        paddingTop: 0,
        justifyContent: 'space-between',
    },
    detailsButton: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    detailsButtonText: {
        textAlign: 'center',
        color: '#2c3e50',
        fontWeight: '500',
        fontSize: 14,
    },
    approveButton: {
        flex: 1,
        backgroundColor: '#27ae60',
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    approveButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: '#e74c3c',
        paddingVertical: 8,
        borderRadius: 6,
    },
    rejectButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
});
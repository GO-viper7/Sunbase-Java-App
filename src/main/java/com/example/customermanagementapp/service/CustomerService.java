package com.example.customermanagementapp.service;

import com.example.customermanagementapp.model.Customer;

import java.util.List;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    
    Customer updateCustomer(String customerId, Customer updatedCustomer);
    
    List<Customer> getAllCustomers();
    
    Customer getCustomerById(String customerId);
    
    void deleteCustomer(String customerId);
}

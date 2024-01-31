package com.example.customermanagementapp.service;

import java.util.UUID;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.customermanagementapp.model.Customer;
import com.example.customermanagementapp.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createCustomer(Customer customer) {
        customer.setId("test" + UUID.randomUUID().toString().replaceAll("-", ""));
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(String customerId, Customer updatedCustomer) {
        Customer existingCustomer = customerRepository.findById(customerId)
                                                     .orElseThrow(() -> new RuntimeException("Customer not found"));
        // Update existing customer fields
        existingCustomer.setFirstName(updatedCustomer.getFirstName());
        existingCustomer.setLastName(updatedCustomer.getLastName());
        existingCustomer.setStreet(updatedCustomer.getStreet());
        existingCustomer.setCity(updatedCustomer.getCity());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setState(updatedCustomer.getState());
        existingCustomer.setAddress(updatedCustomer.getAddress());
        existingCustomer.setPhone(updatedCustomer.getPhone());
        
        return customerRepository.save(existingCustomer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(String customerId) {
        return customerRepository.findById(customerId)
                                 .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public void deleteCustomer(String customerId) {
        customerRepository.deleteById(customerId);
    }
}

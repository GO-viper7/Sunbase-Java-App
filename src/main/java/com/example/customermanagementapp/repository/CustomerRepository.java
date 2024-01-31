package com.example.customermanagementapp.repository;

import org.springframework.stereotype.Repository;
import com.example.customermanagementapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
   
}

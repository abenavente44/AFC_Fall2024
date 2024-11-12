package com.example.playground.repository;

import com.example.playground.entity.Playground;
import com.example.playground.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaygroundRepository extends JpaRepository<Playground, Long> {

    // Find all playgrounds by city from the address table
    @Query("SELECT p FROM Playground p JOIN p.address a WHERE a.city = :city")
    List<Playground> findByAddress(@Param("city") String city);

    // Custom query to find an Address by its city and zip via the Playground entity
    @Query("SELECT p.address FROM Playground p WHERE p.address.city = :city AND p.address.zip = :zip")
    Optional<Address> findAddressByCityAndZip(@Param("city") String city, @Param("zip") String zip);

}

package com.example.playground.service;


import com.example.playground.entity.Address;
import com.example.playground.entity.Playground;
import com.example.playground.repository.PlaygroundRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class PlaygroundService {

    @Autowired
    private PlaygroundRepository playgroundRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public Playground findPlaygroundById(Long id) {
        return playgroundRepository.findById(id).get();
    }

    public List<Playground> findAllPlayground(String city) {
        if (city != null && !city.isEmpty()) {
            // Fetch playgrounds by the provided city
            return playgroundRepository.findByAddress(city);
        }
        // Fetch all playgrounds if city is null or empty
        return playgroundRepository.findAll();
    }

    @Transactional
    public Playground createPlayground(String location, String description, Integer rating,
                                       String feedback, Instant date, Address address) {

        // Step 1: Check if the Address already exists by city and zip
        Optional<Address> existingAddressOpt = playgroundRepository.findAddressByCityAndZip(address.getCity(), address.getZip());

        Address existingAddress;
        if (existingAddressOpt.isPresent()) {
            existingAddress = existingAddressOpt.get();  // Address exists, use it
        } else {
            // Step 2: If the Address does not exist, save it manually
            entityManager.persist(address);  // Directly persist Address

            // Set the saved Address to our variable
            existingAddress = address;
        }

        // Step 3: Create the Playground and associate it with the found or newly created Address
        Playground playground = new Playground();
        playground.setLocation(location);
        playground.setDescription(description);
        playground.setRating(rating);
        playground.setFeedback(feedback);
        playground.setDate(date);
        playground.setAddress(existingAddress);  // Associate with the Address

        // Step 4: Save the Playground and return it
        return playgroundRepository.save(playground);  // Saves the Playground
    }

    @Transactional
    public Playground updatePlayground(Long id, String location, String description, Integer rating,
                                       String feedback, Instant date, Address address) {

        // Step 1: Find the existing Playground by ID
        Playground playground = playgroundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Playground not found with id: " + id));

        // Step 2: Check if the Address exists, if not, save the new address
        Address existingAddress = playground.getAddress();
        if (existingAddress == null || !existingAddress.getCity().equals(address.getCity()) ||
                !existingAddress.getZip().equals(address.getZip())) {

            Optional<Address> existingAddressOpt = playgroundRepository.findAddressByCityAndZip(address.getCity(), address.getZip());

            if (existingAddressOpt.isPresent()) {
                existingAddress = existingAddressOpt.get();  // Use the existing address if found
            } else {
                // Save the new address if no match is found
                entityManager.persist(address);
                existingAddress = address;
            }
        }

        // Step 3: Update the Playground details
        playground.setLocation(location);
        playground.setDescription(description);
        playground.setRating(rating);
        playground.setFeedback(feedback);
        playground.setDate(date);
        playground.setAddress(existingAddress);  // Associate with the updated or existing Address

        // Step 4: Save the updated Playground
        return playgroundRepository.save(playground);  // This updates the existing playground
    }

    public void deletePlayground(Long id) {
        playgroundRepository.deleteById(id);
    }
}


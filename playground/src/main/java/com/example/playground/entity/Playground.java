package com.example.playground.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

@Entity
public class Playground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;
    private String location;
    private String description;
    private int rating;
    private String feedback;
    private Instant date;

   @OneToMany (mappedBy = "playground", fetch = FetchType.LAZY)
   private List<Address> addresses;

    public Playground() {
    }

    public Playground(Long id, String description, int rating, String location, Instant date) {

        this.id = id;
        this.description = description;
        this.location = location;
        this.rating = rating;
        this.feedback = feedback;
        this.date = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String type) {
        this.location = type;
    }
    public Instant getDate() {
        return date;
    }
    public void setDate(Instant date) {
        this.date = date;
    }
    public int getRating() {
        return rating;
    }
    public void seRating(int rating) {
        this.rating = rating;
    }
    public String getFeedback() {
        return feedback;
    }
    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

}

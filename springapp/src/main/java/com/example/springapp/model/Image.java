package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import javax.persistence.Lob;

@Entity
public class Image {
    
    @Id
    @GeneratedValue
    private long id;
    
    private String filename;
    @Lob
    private byte[] image;
    public Image(long id, String filename, byte[] image) {
        this.id = id;
        this.filename = filename;
        this.image = image;
    }
    public Image() {
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }
    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
    
    

}

package com.example.springapp.service;

import java.io.IOException;
import java.util.List;

import com.example.springapp.model.Image;
import com.example.springapp.repository.ImageRepository;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;


@Service
public class ImageService {

    @Autowired
    ImageRepository imageDao;

    public byte[] getImage(String filename){
        return imageDao.findByFilename(filename).get(0).getImage();
    }

    public void storeImage(String filename, MultipartFile poster)throws IOException {
        Image image = new Image();
        image.setFilename(filename);
        image.setImage(poster.getBytes());
        imageDao.save(image);
        
    }

    @Transactional
    public void deleteImage(String filename){
        long c = imageDao.deleteByFilename(filename);
    }
    
}

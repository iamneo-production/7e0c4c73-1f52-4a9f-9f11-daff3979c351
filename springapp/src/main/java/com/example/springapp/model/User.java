package com.example.springapp.model;

import java.util.Date;

<<<<<<< HEAD
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import javax.persistence.Column;
import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

	@Id
=======
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class User {
    @Id
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	@GeneratedValue
	private long userId;
	
	@Column(unique = true, nullable = false)
	private String email;
	private String password;
	private String name;
	// @Column(nullable = false)
	private String role;
	@CreationTimestamp
	private Date createDate;
	@UpdateTimestamp
	private Date updateDate;
	
	
	public User(long userId, String email, String password, String name, String role, Date createDate,
			Date updateDate) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.name = name;
		this.role = role;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	
	public User() {
		super();
<<<<<<< HEAD
		// TODO Auto-generated constructor stub
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	}


	public long getUserId() {
		return userId;
	}


	public void setUserId(long userId) {
		this.userId = userId;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public Date getCreateDate() {
		return createDate;
	}


	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}


	public Date getUpdateDate() {
		return updateDate;
	}


	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public boolean isAdmin(){
		if(role == "ADMIN") return true;
		return false;
	}
	
	public User hideDetails() {
		this.setEmail(null);
		this.setPassword(null);
		return this;
	}
<<<<<<< HEAD
	
	
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
}

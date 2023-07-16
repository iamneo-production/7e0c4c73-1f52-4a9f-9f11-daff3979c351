package com.example.springapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class User {
    @Id
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
		if(role.equals("ADMIN")) return true;
		return false;
	}
	
	public User hideDetails() {
		this.setEmail(null);
		this.setPassword(null);
		return this;
	}
}

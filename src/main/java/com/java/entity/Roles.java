package com.java.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Roles {
    /** 主键 */
    private Integer id;

    /** 角色名 */
    private String roleName;

    /** 角色创建时间 */
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date createDate;

    /** 角色禁用启用状态，1启用,0禁用 */
    private String status;

    /** 1超級角色  0普通角色 */
    private String flag;

    //角色的一级权限名称
    private String firstANames;

    public String getFirstANames() {
        return firstANames;
    }

    public void setFirstANames(String firstANames) {
        this.firstANames = firstANames;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }

    @Override
    public String toString() {
        return "Roles{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                ", createDate=" + createDate +
                ", status='" + status + '\'' +
                ", flag='" + flag + '\'' +
                ", firstANames='" + firstANames + '\'' +
                '}';
    }
}
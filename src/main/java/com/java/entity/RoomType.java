package com.java.entity;

public class RoomType {
    /** 主键 */
    private Integer id;

    /** 房间类型名 */
    private String roomTypeName;

    /** 房间的单价 */
    private Float roomPrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName == null ? null : roomTypeName.trim();
    }

    public Float getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(Float roomPrice) {
        this.roomPrice = roomPrice;
    }

    @Override
    public String toString() {
        return "RoomType{" +
                "id=" + id +
                ", roomTypeName='" + roomTypeName + '\'' +
                ", roomPrice=" + roomPrice +
                '}';
    }
}
package kz.edu.nu.cs.se.model;

public class TrainModel {
    private Integer trainId;
    private Integer capacity;
    private Boolean status;
    private Integer stationId;

    public TrainModel(Integer trainId, Integer capacity) {
        this.trainId = trainId;
        this.capacity = capacity;
    }

    public Integer getTrainId() {
        return trainId;
    }

    public void setTrainId(Integer trainId) {
        this.trainId = trainId;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}

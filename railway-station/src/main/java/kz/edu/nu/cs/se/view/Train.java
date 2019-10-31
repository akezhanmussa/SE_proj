package kz.edu.nu.cs.se.view;

import kz.edu.nu.cs.se.model.TrainModel;

public class Train {
    private Integer trainId;
    private Integer capacity;

    public Train(TrainModel trainModel){
        this.setTrainId(trainModel.getTrainId());
        this.setCapacity(trainModel.getTrainId());
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

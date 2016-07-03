package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.repository.DcDutiesPartitionEntityRepository;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DcDutiesPartitionEntityServiceImpl implements DcDutiesPartitionEntityService {

    @Autowired
    private DcDutiesPartitionEntityRepository dcDutiesPartitionEntityRepository;

    @Override
    public DcDutiesPartitionEntity addDcDutiesPartitionEntity(DcDutiesPartitionEntity bank) {
        DcDutiesPartitionEntity savedDcDutiesPartitionEntity = dcDutiesPartitionEntityRepository.saveAndFlush(bank);

        return savedDcDutiesPartitionEntity;
    }

    @Override
    public void delete(int id) {
        dcDutiesPartitionEntityRepository.delete(id);
    }

    @Override
    public DcDutiesPartitionEntity getByName(String name) {
        return dcDutiesPartitionEntityRepository.findByName(name);
    }

    @Override
    public DcDutiesPartitionEntity editDcDutiesPartitionEntity(DcDutiesPartitionEntity bank) {
        return dcDutiesPartitionEntityRepository.saveAndFlush(bank);
    }

    @Override
    public List<DcDutiesPartitionEntity> getAll() {
        return dcDutiesPartitionEntityRepository.findAll();
    }

}

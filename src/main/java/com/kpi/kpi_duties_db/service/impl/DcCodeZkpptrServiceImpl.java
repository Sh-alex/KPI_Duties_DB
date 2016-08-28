package com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.domain.DcCodeZkpptrEntity;
import com.kpi.kpi_duties_db.repository.DcCodeZkpptrRepository;
import com.kpi.kpi_duties_db.service.DcCodeZkpptrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 25.08.2016
 */

@Service
public class DcCodeZkpptrServiceImpl implements DcCodeZkpptrService {

    @Autowired
    DcCodeZkpptrRepository dcCodeZkpptrRepository;

    @Override
    public DcCodeZkpptrEntity add(DcCodeZkpptrEntity entity) {
        return dcCodeZkpptrRepository.saveAndFlush(entity);
    }

    @Override
    public void delete(int id) {
        dcCodeZkpptrRepository.delete(id);
    }

    @Override
    public DcCodeZkpptrEntity edit(DcCodeZkpptrEntity entity) {
        return dcCodeZkpptrRepository.saveAndFlush(entity);
    }

    @Override
    public List<DcCodeZkpptrEntity> getAll() {
        return dcCodeZkpptrRepository.findAll();
    }
}

package test.com.kpi.kpi_duties_db.service.impl;

import com.kpi.kpi_duties_db.config.DataConfig;
import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.service.impl.DcDutiesPartitionEntityServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;

import static org.junit.Assert.assertNotNull;




@DirtiesContext
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DataConfig.class)
@WebAppConfiguration
public class DcDutiesPartitionEntityServiceImplTest {

    @Resource
    private EntityManagerFactory emf;
    protected EntityManager em;

    @Resource
    private DcDutiesPartitionEntityServiceImpl dcDutiesPartitionEntityService;

    @Before
    public void setUp() throws Exception {
        em = emf.createEntityManager();
    }

    @Test
    public void add() throws Exception {
        DcDutiesPartitionEntity dcDutiesPartitionEntity = new DcDutiesPartitionEntity();
        dcDutiesPartitionEntity.setDcDutiesPartitionName("Test2");
        dcDutiesPartitionEntityService.add(dcDutiesPartitionEntity);
    }

    @Test
    public void delete() throws Exception {
        dcDutiesPartitionEntityService.delete(17);
    }

    @Test
    public void getByName() throws Exception {
        DcDutiesPartitionEntity dcDutiesPartitionEntity =  dcDutiesPartitionEntityService.getByName("Test");

        assertNotNull(dcDutiesPartitionEntity);
    }

    @Test
    public void edit() throws Exception {
        DcDutiesPartitionEntity dcDutiesPartitionEntity =  dcDutiesPartitionEntityService.getByName("Test12");
        dcDutiesPartitionEntity.setDcDutiesPartitionName("Test");
        dcDutiesPartitionEntityService.edit(dcDutiesPartitionEntity);
    }

    @Test
    @Transactional
    public void getAll() throws Exception {
        List<DcDutiesPartitionEntity> dcDutiesPartitionEntities =  dcDutiesPartitionEntityService.getAll();

        assertNotNull(dcDutiesPartitionEntities);
    }

}
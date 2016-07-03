package test.com.kpi.kpi_duties_db.service;

import com.kpi.kpi_duties_db.config.DataConfig;
import com.kpi.kpi_duties_db.domain.DcDutiesPartitionEntity;
import com.kpi.kpi_duties_db.service.DcDutiesPartitionEntityService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

@DirtiesContext
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DataConfig.class)
@WebAppConfiguration
public class DcDutiesPartitionEntityServiceTest {

    @Resource
    private EntityManagerFactory emf;
    protected EntityManager em;

    @Resource
    private DcDutiesPartitionEntityService dcDutiesPartitionEntityService;

    @Before
    public void setUp() throws Exception {
        em = emf.createEntityManager();
    }

    @Test
    public void testSaveDcDutiesPartitionEntity() throws Exception {

        DcDutiesPartitionEntity dcDutiesPartitionEntity = new DcDutiesPartitionEntity();
        dcDutiesPartitionEntity.setDcDutiesPartitionName("Test2");
        dcDutiesPartitionEntityService.addDcDutiesPartitionEntity(dcDutiesPartitionEntity);
    }

    @Test
    public void testDeleteDcDutiesPartitionEntity() throws Exception {

        dcDutiesPartitionEntityService.delete(15);
    }

}
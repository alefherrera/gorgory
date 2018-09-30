package org.ungs.gorgory.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
@JsonInclude(JsonInclude.Include.NON_NULL)
abstract class BaseEntity {

    @Column
    @CreationTimestamp
    private Date createDateTime;

    @Column
    @UpdateTimestamp
    private Date updateDateTime;

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }
}

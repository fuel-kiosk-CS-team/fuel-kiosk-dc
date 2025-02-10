import React, { useState } from 'react';
import styles from './FuelEntryForm.module.css';

export function FuelEntryForm({ siteInfo, initialValues = {}, onSubmit }) {
  const defaultValues = {
    dateTimeInsert: new Date()
      .toLocaleString('en-US', { hour12: false })
      .replace(/,/g, ''),
    date: new Date().toLocaleDateString(),
    totalizerStart: '',
    fuelSite: siteInfo?.label || '',
    fuelType: '',
    eqLicense: '',
    nameInitials: '',
    odometer: '',
    gallonsPumped: '',
    expCategory: '',
    projectUnit: '',
  };

  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      ...defaultValues,
      dateTimeInsert: new Date().toLocaleString(),
      date: new Date().toLocaleDateString(),
      fuelSite: siteInfo?.label || '',
      ...initialValues,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label className={styles.label}>Date/Time Insert</label>
          <input
            type="text"
            value={formData.dateTimeInsert || ''}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Date</label>
          <input
            type="text"
            value={formData.date || ''}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Totalizer Start (xxx.x)</label>
          <input
            type="text"
            value={formData.totalizerStart || ''}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Fuel Site</label>
          <input
            type="text"
            value={formData.fuelSite || ''}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Fuel Type</label>
          <input
            type="text"
            value={formData.fuelType || ''}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>EQ License or Desc.</label>
          <input
            type="text"
            value={formData.eqLicense || ''}
            onChange={(e) =>
              setFormData({ ...formData, eqLicense: e.target.value })
            }
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Name, initials, etc.</label>
          <input
            type="text"
            value={formData.nameInitials || ''}
            onChange={(e) =>
              setFormData({ ...formData, nameInitials: e.target.value })
            }
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Odometer (If Required)</label>
          <input
            type="text"
            value={formData.odometer}
            onChange={(e) =>
              setFormData({ ...formData, odometer: e.target.value })
            }
            className={styles.input}
            placeholder="No Tenths"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Gallons Pumped (xx.x)</label>
          <input
            type="text"
            value={formData.gallonsPumped}
            onChange={(e) =>
              setFormData({ ...formData, gallonsPumped: e.target.value })
            }
            className={styles.input}
            placeholder="0.0"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Exp. Category: (Required)</label>
          <select
            value={formData.expCategory}
            onChange={(e) =>
              setFormData({ ...formData, expCategory: e.target.value })
            }
            className={styles.select}
            required
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            <option value="Field Work">Field Work</option>
            <option value="Research">Research</option>
            <option value="Local Travel">Local Travel</option>
            <option value="Out of state travel">Out of state travel</option>
            <option value="Various">Various</option>
            <option value="Totalizer Reading">Totalizer Reading</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Project or Unit</label>
          <input
            type="text"
            value={formData.projectUnit}
            onChange={(e) =>
              setFormData({ ...formData, projectUnit: e.target.value })
            }
            className={styles.input}
            placeholder="Recommended"
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={styles.resetButton}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
export class MechanicalForm {
    lightChecks: boolean[];
    date: string | null;
    hour: string | null;
    description: string | null;
    fullName: string | null;
    phone: string | null;
  
    constructor(
        lightChecks: boolean[] = [],
      date: string | null = null,
      hour: string | null = null,
      description: string | null = null,
      fullName: string | null = null,
      phone: string | null = null
    ) {
      this.lightChecks = lightChecks;
      this.date = date;
      this.hour = hour;
      this.description = description;
      this.fullName = fullName;
      this.phone = phone
    }
  }  
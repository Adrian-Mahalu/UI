export class DetailingForm {
    fullName: string | null;
    phone: string | null;
    carBrand: string | null;
    bodyType: string | null;
    packageOption: string;
    date: string | null
    hour: string | null;

    constructor(fullName: string | null = null,
        phone: string | null = null,
        carBrand: string | null = null,
        bodyType: string | null = null,
        packageOption: string = 'Basic',
        date: string | null = null,
        hour: string | null = null) {
        this.fullName = fullName;
        this.phone = phone;
        this.carBrand = carBrand;
        this.bodyType = bodyType;
        this.packageOption = packageOption;
        this.date = date;
        this.hour = hour;
    }
}
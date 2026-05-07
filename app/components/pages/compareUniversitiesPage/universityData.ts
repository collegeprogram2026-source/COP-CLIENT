export interface University {
    id: string; // Changed to string for MongoDB _id
    name: string;
    location: string;
    programType: string;
    duration: string;
    fee: string;
    feeDescription: string;
    logo: string;
    intakePeriod: string;
    timeCommitment: string;
    totalSeats: string;
    studentRating: number;
    nationalRanking: string;
    accreditation: string;
    minRequirements: string;
    learningMode: string;
    specializations: string;
    totalStudents: string;
    keyHighlights: string[];
    emiOption?: string;
    bestROI?: boolean;
    intake?: string;
    recognition?: { ugc?: string; aicte?: string; naac?: string; nirf?: string };
    ranking?: string;
    placements: {
        highest?: string;
        rate: string;
        average: string;
    };
}

export const universities: University[] = [
    {
        id: "1",
        name: "Amity University Online",
        location: "Noida, Uttar Pradesh",
        programType: "Online Degree",
        duration: "2 Years",
        fee: "₹2,50,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).webp",
        intake: "July / January",
        recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 50" },
        ranking: "35th in India",
        studentRating: 4.8,
        placements: { highest: "58 LPA", average: "8.5 LPA", rate: "95%" },
        accreditation: "UGC, NAAC A++",
        learningMode: "Online",
        specializations: "50+",
        totalStudents: "10,000+",
        keyHighlights: ["Industry-aligned curriculum", "Flexible learning schedules", "Live interactive sessions", "Career support services"],
        emiOption: "₹6,530/month",
        intakePeriod: "Jan/Apr/Jul/Oct",
        timeCommitment: "8-10 hrs/week",
        totalSeats: "6000+",
        nationalRanking: "Top 50 Private",
        minRequirements: "10+2 or equivalent"
    },
    {
        id: "2",
        name: "Manipal University Online",
        location: "Manipal, Karnataka",
        programType: "Online Degree",
        duration: "2 Years",
        fee: "₹2,50,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).webp",
        intake: "August / February",
        recognition: { ugc: "Yes", aicte: "Yes", naac: "A+", nirf: "Top 70" },
        ranking: "42nd in India",
        studentRating: 4.6,
        placements: { highest: "45 LPA", average: "7.2 LPA", rate: "90%" },
        accreditation: "UGC, NAAC A+",
        learningMode: "Online",
        specializations: "45+",
        totalStudents: "15,000+",
        keyHighlights: ["Global recognition", "Expert faculty", "Comprehensive study materials", "Placement assistance"],
        emiOption: "₹6,630/month",
        intakePeriod: "Rolling",
        timeCommitment: "10-12 hrs/week",
        totalSeats: "8000+",
        nationalRanking: "Top 100 Private",
        minRequirements: "10+2 or equivalent"
    },
    {
        id: "3",
        name: "Chandigarh University",
        location: "Mohali, Punjab",
        programType: "Online Degree",
        duration: "3 Years",
        fee: "₹1,80,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).webp",
        intake: "June / December",
        recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 30" },
        ranking: "27th in India",
        studentRating: 4.7,
        placements: { highest: "52 LPA", average: "9.1 LPA", rate: "98%" },
        accreditation: "UGC, NAAC A++",
        learningMode: "Online",
        specializations: "60+",
        totalStudents: "8,000+",
        keyHighlights: ["Modern learning platform", "Industry partnerships", "Dedicated mentors", "Flexible payment options"],
        emiOption: "₹5,500/month",
        intakePeriod: "Jan/Jul",
        timeCommitment: "12-15 hrs/week",
        totalSeats: "5000+",
        nationalRanking: "Top 30 Private",
        minRequirements: "10+2 or equivalent"
    },
    {
        id: "4",
        name: "Amrita Vishwavidyapeetham",
        location: "Coimbatore, Tamil Nadu",
        programType: "Online Degree",
        duration: "2 Years",
        fee: "₹1,80,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).webp",
        intake: "July / January",
        recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 10" },
        ranking: "7th in India",
        studentRating: 4.9,
        placements: { highest: "56 LPA", average: "10.2 LPA", rate: "97%" },
        accreditation: "UGC, NAAC A++",
        learningMode: "Online",
        specializations: "40+",
        totalStudents: "12,000+",
        keyHighlights: ["Stellar research opportunities", "Valued alumni network", "Skill-based learning", "Holistic development"],
        emiOption: "₹7,200/month",
        intakePeriod: "Feb/Aug",
        timeCommitment: "10-14 hrs/week",
        totalSeats: "7000+",
        nationalRanking: "Top 10 Private",
        minRequirements: "10+2 or equivalent"
    }
];

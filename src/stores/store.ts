
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

import { localStorageStore } from '@skeletonlabs/skeleton';


interface aiCategory {
    tag_id: number;
    tag_name: string;
    category_id: number;
    tag_desc: string;
   
}
export const lighttoggle = writable<boolean | undefined>(false);

interface tagicon {
	tagicon: string;
}


export const tagicon: Writable<string[]> = localStorageStore('tagicon', 
[
	"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",
	"https://www.aitoolslist.com/icons/ai-image-generators.svg",
 ]);

// Each category now has its own tools
export const aiCategories: Writable<aiCategory[]> = localStorageStore('aiCategories', [
	{
	   tag_id:1, 
	   tag_name:"Ai Chatbot",
	   category_id:1,
	   tag_desc:"Interactive Ai Systems For Automated Communication."
	},
	{
	   tag_id:2, 
	   tag_name:"Ai Image Generators",
	   category_id:1,
	   tag_desc:"Ai Tools For Creating And Designing Images."
	},
	{
	   tag_id:3, 
	   tag_name:"Image Editors",
	   category_id:1,
	   tag_desc:"Software For Editing And Manipulating Images."
	},
	{
	   tag_id:4, 
	   tag_name:"Voice Generators ",
	   category_id:1,
	   tag_desc:"Ai Tools For Generating Synthetic Speech."
	},
	{
	   tag_id:5, 
	   tag_name:"Machine Learning Platforms ",
	   category_id:1,
	   tag_desc:"Platforms For Developing And Deploying Machine Learning Models."
	},
	{
	   tag_id:6, 
	   tag_name:"Featured ",
	   category_id:1,
	   tag_desc:"Highlighted Or Specially Selected Tools."
	},
	{
	   tag_id:7, 
	   tag_name:"Fun",
	   category_id:1,
	   tag_desc:"Ai Tools Designed For Entertainment And Enjoyment."
	},
	{
	   tag_id:8, 
	   tag_name:"Discounts",
	   category_id:1,
	   tag_desc:"Ai Tools Available At Reduced Prices Or With Special Offers."
	},
	{
	   tag_id:9, 
	   tag_name:"Best Gpts",
	   category_id:1,
	   tag_desc:"Top Ai Models Based On Openai's Gpt Architecture."
	},
	{
	   tag_id:10, 
	   tag_name:"Best Free Tools",
	   category_id:1,
	   tag_desc:"Highly Rated Ai Tools Available For Free."
	},
	{
	   tag_id:11, 
	   tag_name:"Best Ai Google Extensions",
	   category_id:1,
	   tag_desc:"Top Ai-powered Extensions For Google Products."
	},
	{
	   tag_id:12, 
	   tag_name:"Best Ai Gadgets",
	   category_id:1,
	   tag_desc:"Highly Recommended Ai-enabled Gadgets."
	},
	{
	   tag_id:13, 
	   tag_name:"Best Placeholder",
	   category_id:1,
	   tag_desc:"Top Tools For Generating Placeholder Content."
	},
	{
	   tag_id:14, 
	   tag_name:"Best Placeholder",
	   category_id:1,
	   tag_desc:"Placeholder For Something"
	},
	{
	   tag_id:15, 
	   tag_name:"Ai Marketing",
	   category_id:2,
	   tag_desc:"Ai Tools For Digital Marketing And Advertising."
	},
	{
	   tag_id:16, 
	   tag_name:"Ai Business Intelligence",
	   category_id:2,
	   tag_desc:"Ai Solutions For Business Data Analysis."
	},
	{
	   tag_id:17, 
	   tag_name:"Ai Developer",
	   category_id:2,
	   tag_desc:"Ai Tools Tailored For Software Developers."
	},
	{
	   tag_id:18, 
	   tag_name:"Ai Project Management",
	   category_id:2,
	   tag_desc:"Ai Solutions For Managing And Optimizing Projects."
	},
	{
	   tag_id:19, 
	   tag_name:"Ai Finance Analyzers",
	   category_id:2,
	   tag_desc:"Ai Tools For Financial Data Analysis And Predictions."
	},
	{
	   tag_id:20, 
	   tag_name:"Ai Seo",
	   category_id:2,
	   tag_desc:"Ai Tools For Search Engine Optimization."
	},
	{
	   tag_id:21, 
	   tag_name:"Ai Content Creator",
	   category_id:2,
	   tag_desc:"Ai Applications For Content Creation And Curation."
	},
	{
	   tag_id:22, 
	   tag_name:"Ai E-commerce",
	   category_id:2,
	   tag_desc:"Ai Tools Designed For Online Retail And E-commerce."
	},
	{
	   tag_id:23, 
	   tag_name:"Ai Operations",
	   category_id:2,
	   tag_desc:"Ai Solutions For Operational Efficiency And Automation."
	},
	{
	   tag_id:24, 
	   tag_name:"Ai Hr Tools",
	   category_id:2,
	   tag_desc:"Ai Tools For Human Resource Management."
	},
	{
	   tag_id:25, 
	   tag_name:"Ai Copywriter",
	   category_id:2,
	   tag_desc:"Ai-powered Writing And Content Generation Tools."
	},
	{
	   tag_id:26, 
	   tag_name:"Ai Social Manager",
	   category_id:2,
	   tag_desc:"Ai Tools For Managing Social Media Platforms."
	},
	{
	   tag_id:27, 
	   tag_name:"Ai Real Estate",
	   category_id:2,
	   tag_desc:"Ai Applications In The Real Estate Industry."
	},
	{
	   tag_id:28, 
	   tag_name:"Ai Email Integration",
	   category_id:2,
	   tag_desc:"Ai Tools For Enhancing And Automating Email Communication."
	},
	{
	   tag_id:29, 
	   tag_name:"Ai Multilingual",
	   category_id:2,
	   tag_desc:"Ai Solutions For Language Translation And Multilingual Support."
	},
	{
	   tag_id:30, 
	   tag_name:"Ai Timekeeping",
	   category_id:2,
	   tag_desc:"Ai Tools For Time Management And Tracking."
	},
	{
	   tag_id:31, 
	   tag_name:"Ai Document Analyzer",
	   category_id:2,
	   tag_desc:"Ai Systems For Analyzing And Interpreting Documents."
	},
	{
	   tag_id:32, 
	   tag_name:"Ai Presenters",
	   category_id:2,
	   tag_desc:"Ai Tools For Creating And Enhancing Presentations."
	},
	{
	   tag_id:33, 
	   tag_name:"Ai Resumes Optimizer",
	   category_id:2,
	   tag_desc:"Ai Solutions For Optimizing And Improving Resumes."
	},
	{
	   tag_id:34, 
	   tag_name:"Ai Logo Makers",
	   category_id:2,
	   tag_desc:"Ai Applications For Designing Logos."
	},
	{
	   tag_id:35, 
	   tag_name:"Ai Slides",
	   category_id:2,
	   tag_desc:"Ai Tools For Creating And Enhancing Slide Presentations."
	},
	{
	   tag_id:36, 
	   tag_name:"Ai Jobs",
	   category_id:2,
	   tag_desc:"Ai Solutions Related To Employment And Career Opportunities."
	},
	{
	   tag_id:37, 
	   tag_name:"Ai Lead Generations",
	   category_id:2,
	   tag_desc:"Ai Tools For Generating Business Leads."
	},
	{
	   tag_id:38, 
	   tag_name:"Ai Assistant",
	   category_id:2,
	   tag_desc:"Ai-powered Personal Or Professional Assistants."
	},
	{
	   tag_id:39, 
	   tag_name:"Ai Headshots",
	   category_id:2,
	   tag_desc:"Ai Applications For Creating Or Enhancing Headshot Photos."
	},
	{
	   tag_id:40, 
	   tag_name:"Ai Forms",
	   category_id:2,
	   tag_desc:"Ai Tools For Form Creation And Automation."
	},
	{
	   tag_id:41, 
	   tag_name:"Ai Spreadsheets",
	   category_id:2,
	   tag_desc:"Ai Solutions For Spreadsheet Creation And Data Analysis."
	},
	{
	   tag_id:42, 
	   tag_name:"Ai For Crypto",
	   category_id:2,
	   tag_desc:"Ai Applications In Cryptocurrency And Blockchain."
	},
	{
	   tag_id:43, 
	   tag_name:"Ai Scrapers ",
	   category_id:2,
	   tag_desc:"Ai Tools For Web Scraping And Data Extraction."
	},
	{
	   tag_id:44, 
	   tag_name:"Ai Professionals",
	   category_id:2,
	   tag_desc:"Experts And Specialists In The Field Of Ai."
	},
	{
	   tag_id:45, 
	   tag_name:"Ai Research Tools",
	   category_id:3,
	   tag_desc:"Tools Designed For Conducting Ai Research."
	},
	{
	   tag_id:46, 
	   tag_name:"Ai Data Visualization",
	   category_id:3,
	   tag_desc:"Ai Applications For Visualizing Complex Data Sets."
	},
	{
	   tag_id:47, 
	   tag_name:"Ai For Data",
	   category_id:3,
	   tag_desc:"Ai Solutions Focused On Data Processing And Analysis."
	},
	{
	   tag_id:48, 
	   tag_name:"Ai Llms (Large Language Models)",
	   category_id:3,
	   tag_desc:"Advanced Ai Models For Processing And Generating Human-like Text."
	},
	{
	   tag_id:49, 
	   tag_name:"Ai Cloud",
	   category_id:3,
	   tag_desc:"Cloud-based Ai Services And Platforms."
	},
	{
	   tag_id:50, 
	   tag_name:"Ai Language Learning",
	   category_id:3,
	   tag_desc:"Ai Tools For Aiding In Language Acquisition And Learning."
	},
	{
	   tag_id:51, 
	   tag_name:"Ai Research",
	   category_id:3,
	   tag_desc:"Ai-focused Research And Development Initiatives."
	},
	{
	   tag_id:52, 
	   tag_name:"Ai Classes",
	   category_id:3,
	   tag_desc:"Educational Courses And Resources On Ai."
	},
	{
	   tag_id:53, 
	   tag_name:"Ai Teachers",
	   category_id:3,
	   tag_desc:"Ai-powered Platforms And Tools For Teaching."
	},
	{
	   tag_id:54, 
	   tag_name:"Ai Educational Institutions",
	   category_id:3,
	   tag_desc:"Schools And Universities Integrating Ai Into Their Curricula."
	},
	{
	   tag_id:55, 
	   tag_name:"Ai Summarizer",
	   category_id:3,
	   tag_desc:"Tools That Use Ai To Create Concise Summaries Of Text."
	},
	{
	   tag_id:56, 
	   tag_name:"Ai Document Chat",
	   category_id:3,
	   tag_desc:"Ai Systems That Enable Interactive, Document-based Discussions."
	},
	{
	   tag_id:57, 
	   tag_name:"Ai Pdf",
	   category_id:3,
	   tag_desc:"Ai Tools Specifically For Pdf Document Handling And Editing."
	},
	{
	   tag_id:58, 
	   tag_name:"Ai Note Taker",
	   category_id:3,
	   tag_desc:"Ai Applications Designed For Efficient Note-taking."
	},
	{
	   tag_id:59, 
	   tag_name:"Ai Prompt Generators",
	   category_id:3,
	   tag_desc:"Ai Tools That Generate Creative And Contextual Prompts."
	},
	{
	   tag_id:60, 
	   tag_name:"Ai Editor",
	   category_id:3,
	   tag_desc:"Ai-enhanced Editing Software For Various Types Of Content."
	},
	{
	   tag_id:61, 
	   tag_name:"Ai Video Summarizers",
	   category_id:3,
	   tag_desc:"Ai Applications That Produce Summaries Of Video Content."
	},
	{
	   tag_id:62, 
	   tag_name:"Ai Course Builders",
	   category_id:3,
	   tag_desc:"Tools For Creating Educational Courses Using Ai."
	},
	{
	   tag_id:63, 
	   tag_name:"Ai Plagiarism Detector",
	   category_id:3,
	   tag_desc:"Ai Tools Designed To Detect Plagiarism In Text."
	},
	{
	   tag_id:64, 
	   tag_name:"Ai Research Paper Tools",
	   category_id:3,
	   tag_desc:"Ai Solutions For Aiding In Research Paper Writing And Editing."
	},
	{
	   tag_id:65, 
	   tag_name:"Ai Cheatsheets",
	   category_id:3,
	   tag_desc:"Concise, Ai-generated Reference Materials For Quick Information Access."
	},
	{
	   tag_id:66, 
	   tag_name:"Ai Books",
	   category_id:3,
	   tag_desc:"Ai-driven Tools For Book Creation, Analysis, And Curation."
	},
	{
	   tag_id:67, 
	   tag_name:"Ai Flashcards",
	   category_id:3,
	   tag_desc:"Ai Tools For Creating Educational Flashcards."
	},
	{
	   tag_id:68, 
	   tag_name:"Ai Quizlet",
	   category_id:3,
	   tag_desc:"Ai-enhanced Platforms Similar To Quizlet For Learning And Studying."
	},
	{
	   tag_id:69, 
	   tag_name:"Ai Learn Tools",
	   category_id:3,
	   tag_desc:"Ai Applications Aimed At Facilitating Self-directed Learning."
	},
	{
	   tag_id:70, 
	   tag_name:"Ai Communities",
	   category_id:3,
	   tag_desc:"Online Groups And Forums Focused On Ai Topics And Discussions."
	},
	{
	   tag_id:71, 
	   tag_name:"Ai Discord Communities",
	   category_id:3,
	   tag_desc:"Ai-centered Communities Within The Discord Platform."
	},
	{
	   tag_id:72, 
	   tag_name:"Ai Prompting",
	   category_id:3,
	   tag_desc:"Ai Systems Designed To Offer Prompts And Suggestions."
	},
	{
	   tag_id:73, 
	   tag_name:"Ai Attribution",
	   category_id:3,
	   tag_desc:"Ai Tools For Attributing Creative Work And Content Accurately."
	},
	{
	   tag_id:74, 
	   tag_name:"Ai Tuning",
	   category_id:3,
	   tag_desc:"Ai Solutions For Customizing And Fine-tuning Ai Models."
	},
	{
	   tag_id:75, 
	   tag_name:"Ai Social Media Tools",
	   category_id:4,
	   tag_desc:"Ai Applications For Enhancing Social Media Engagement And Management."
	},
	{
	   tag_id:76, 
	   tag_name:"Ai Podcast",
	   category_id:4,
	   tag_desc:"Best Podcast To Follow For Ai"
	},
	{
	   tag_id:77, 
	   tag_name:"Ai Youtubers",
	   category_id:4,
	   tag_desc:"Best Ai Youtubers To Follow For Ai"
	},
	{
	   tag_id:78, 
	   tag_name:"Ai Music",
	   category_id:4,
	   tag_desc:"Ai Solutions For Music Composition, Editing, And Analysis."
	},
	{
	   tag_id:79, 
	   tag_name:"Ai Games",
	   category_id:4,
	   tag_desc:"Ai-driven Games And Gaming Platforms."
	},
	{
	   tag_id:80, 
	   tag_name:"Ai Blogs",
	   category_id:4,
	   tag_desc:"Ai Tools For Blog Content Creation And Management."
	},
	{
	   tag_id:81, 
	   tag_name:"Ai Twitter",
	   category_id:4,
	   tag_desc:"Best Twitter Accounts Follow For Ai"
	},
	{
	   tag_id:82, 
	   tag_name:"Ai Tiktok",
	   category_id:4,
	   tag_desc:"Best Tiktokers And Shorts Content Creators And Enhancement."
	},
	{
	   tag_id:83, 
	   tag_name:"Ai Conversations",
	   category_id:4,
	   tag_desc:"Ai Systems For Simulating And Managing Digital Conversations."
	},
	{
	   tag_id:84, 
	   tag_name:"Ai Companions",
	   category_id:4,
	   tag_desc:"Ai-powered Virtual Companions And Assistants."
	},
	{
	   tag_id:85, 
	   tag_name:"Ai Celebrities",
	   category_id:4,
	   tag_desc:"Ai Applications Related To Celebrity Culture And Media."
	},
	{
	   tag_id:86, 
	   tag_name:"Ai Sports",
	   category_id:4,
	   tag_desc:"Ai Tools For Sports Analysis, Training, And Enhancement."
	},
	{
	   tag_id:87, 
	   tag_name:"Ai Voice Chat",
	   category_id:4,
	   tag_desc:"Ai Solutions For Voice Communication And Enhancement."
	},
	{
	   tag_id:88, 
	   tag_name:"Ai Chess",
	   category_id:4,
	   tag_desc:"Ai Platforms For Playing, Learning, And Analyzing Chess."
	},
	{
	   tag_id:89, 
	   tag_name:"Ai Novels",
	   category_id:4,
	   tag_desc:"Ai Applications For Writing And Analyzing Novels."
	},
	{
	   tag_id:90, 
	   tag_name:"Ai Stories",
	   category_id:4,
	   tag_desc:"Ai Tools For Generating And Analyzing Stories."
	},
	{
	   tag_id:91, 
	   tag_name:"Ai Comedy",
	   category_id:4,
	   tag_desc:"Ai Applications Focused On Creating And Understanding Comedic Content."
	},
	{
	   tag_id:92, 
	   tag_name:"Ai Memes",
	   category_id:4,
	   tag_desc:"Ai Tools For Meme Generation And Analysis."
	},
	{
	   tag_id:93, 
	   tag_name:"Ai Anime",
	   category_id:4,
	   tag_desc:"Ai-driven Tools For Anime Creation And Analysis."
	},
	{
	   tag_id:94, 
	   tag_name:"Ai Friends",
	   category_id:4,
	   tag_desc:"Ai Applications For Creating Virtual Friends Or Companions."
	},
	{
	   tag_id:95, 
	   tag_name:"Ai Style Editor",
	   category_id:4,
	   tag_desc:"Ai Tools For Editing And Enhancing Visual And Artistic Styles."
	},
	{
	   tag_id:96, 
	   tag_name:"Ai 3d Avatar",
	   category_id:4,
	   tag_desc:"Ai Applications For Creating And Customizing 3d Avatars."
	},
	{
	   tag_id:97, 
	   tag_name:"Ai Self Avatars",
	   category_id:4,
	   tag_desc:"Ai Tools For Generating Personalized Avatars."
	},
	{
	   tag_id:98, 
	   tag_name:"Ai Image Rating",
	   category_id:4,
	   tag_desc:"Ai Systems For Evaluating And Rating Images."
	},
	{
	   tag_id:99, 
	   tag_name:"Ai Deepfakes",
	   category_id:4,
	   tag_desc:"Ai Technology For Creating Realistic Video And Audio Fakes."
	},
	{
	   tag_id:100, 
	   tag_name:"Ai Faceswap",
	   category_id:4,
	   tag_desc:"Ai Applications For Swapping Faces In Images And Videos."
	},
	{
	   tag_id:101, 
	   tag_name:"Ai Fun",
	   category_id:4,
	   tag_desc:"Ai Tools Designed For Entertainment And Fun Activities."
	},
	{
	   tag_id:102, 
	   tag_name:"Ai Toys",
	   category_id:4,
	   tag_desc:"Ai-enhanced Toys And Games For Children."
	},
	{
	   tag_id:103, 
	   tag_name:"Ai Gambling",
	   category_id:4,
	   tag_desc:"Ai Solutions For Gambling And Betting Platforms."
	},
	{
	   tag_id:104, 
	   tag_name:"Ai Animations",
	   category_id:4,
	   tag_desc:"Ai Tools For Creating And Editing Animations."
	},
	{
	   tag_id:105, 
	   tag_name:"Ai Translators",
	   category_id:5,
	   tag_desc:"Ai-powered Language Translation Tools."
	},
	{
	   tag_id:106, 
	   tag_name:"Ai Robots",
	   category_id:5,
	   tag_desc:"Ai-driven Robotic Systems For Various Applications."
	},
	{
	   tag_id:107, 
	   tag_name:"Ai Website Builder",
	   category_id:5,
	   tag_desc:"Ai Tools For Automated Website Creation And Design."
	},
	{
	   tag_id:108, 
	   tag_name:"Ai Chatbot Ui",
	   category_id:5,
	   tag_desc:"User Interfaces Specifically Designed For Ai Chatbots."
	},
	{
	   tag_id:109, 
	   tag_name:"Ai For Ui/ux",
	   category_id:5,
	   tag_desc:"Ai Applications In User Interface And User Experience Design."
	},
	{
	   tag_id:110, 
	   tag_name:"Ai Gadgets",
	   category_id:5,
	   tag_desc:"Ai-enhanced Gadgets And Devices For Various Uses."
	},
	{
	   tag_id:111, 
	   tag_name:"Ai Authenticators",
	   category_id:5,
	   tag_desc:"Ai Tools For Secure Authentication And Identity Verification."
	},
	{
	   tag_id:112, 
	   tag_name:"Ai Summarizers",
	   category_id:5,
	   tag_desc:"Ai Applications That Generate Summaries Of Text Content."
	},
	{
	   tag_id:113, 
	   tag_name:"Ai Voice Trainers",
	   category_id:5,
	   tag_desc:"Ai Tools For Training And Enhancing Voice Models."
	},
	{
	   tag_id:114, 
	   tag_name:"Ai Search Engines",
	   category_id:5,
	   tag_desc:"Ai-powered Search Engines For Improved Information Retrieval."
	},
	{
	   tag_id:115, 
	   tag_name:"Ai Code Generator",
	   category_id:5,
	   tag_desc:"Ai Applications For Generating And Optimizing Code."
	},
	{
	   tag_id:116, 
	   tag_name:"Ai Image Filtering",
	   category_id:5,
	   tag_desc:"Ai Tools For Filtering And Enhancing Images."
	},
	{
	   tag_id:117, 
	   tag_name:"Ai Object Detection",
	   category_id:5,
	   tag_desc:"Ai Systems For Identifying And Classifying Objects In Images."
	},
	{
	   tag_id:118, 
	   tag_name:"Ai Apis",
	   category_id:5,
	   tag_desc:"Ai-powered Application Programming Interfaces For Various Uses."
	},
	{
	   tag_id:119, 
	   tag_name:"Ai Libraries",
	   category_id:5,
	   tag_desc:"Collections Of Ai Resources And Tools For Developers."
	},
	{
	   tag_id:120, 
	   tag_name:"Ai Agents",
	   category_id:5,
	   tag_desc:"Ai Systems Designed To Act Autonomously Or Semi-autonomously."
	},
	{
	   tag_id:121, 
	   tag_name:"Ai Debuggers",
	   category_id:5,
	   tag_desc:"Ai Tools For Identifying And Resolving Issues In Software."
	},
	{
	   tag_id:122, 
	   tag_name:"Ai Automators",
	   category_id:5,
	   tag_desc:"Ai Solutions For Automating Tasks And Processes."
	},
	{
	   tag_id:123, 
	   tag_name:"Ai Wearables",
	   category_id:5,
	   tag_desc:"Ai-integrated Wearable Technology."
	},
	{
	   tag_id:124, 
	   tag_name:"Ai Augmentation",
	   category_id:5,
	   tag_desc:"Ai Tools For Augmenting Human Capabilities In Various Fields."
	},
	{
	   tag_id:125, 
	   tag_name:"Ai Hybrids",
	   category_id:5,
	   tag_desc:"Ai Solutions That Blend Different Technologies And Approaches."
	},
	{
	   tag_id:126, 
	   tag_name:"Ai Specialization",
	   category_id:5,
	   tag_desc:"Ai Applications Focused On Specialized Areas Or Industries."
	},
	{
	   tag_id:127, 
	   tag_name:"Ai Scrapping",
	   category_id:5,
	   tag_desc:"Ai Tools For Extracting And Harvesting Data From Various Sources."
	},
	{
	   tag_id:128, 
	   tag_name:"Ai Posing",
	   category_id:5,
	   tag_desc:"Ai Applications For Posing And Animation In Digital Media."
	},
	{
	   tag_id:129, 
	   tag_name:"Ai For Ar",
	   category_id:5,
	   tag_desc:"Ai Solutions Tailored For Augmented Reality Experiences."
	},
	{
	   tag_id:130, 
	   tag_name:"Ai Motion Capture",
	   category_id:5,
	   tag_desc:"Ai Tools For Capturing And Analyzing Motion For Digital Use."
	},
	{
	   tag_id:131, 
	   tag_name:"Ai Amazon Products",
	   category_id:5,
	   tag_desc:"Ai Tools And Applications Specifically For Amazon Platform Users."
	},
	{
	   tag_id:132, 
	   tag_name:"Ai Spotting",
	   category_id:5,
	   tag_desc:"Ai Systems For Identifying Trends, Anomalies, Or Specific Items."
	},
	{
	   tag_id:133, 
	   tag_name:"Ai Builders",
	   category_id:5,
	   tag_desc:"Ai Platforms For Building And Creating Ai Models Or Systems."
	},
	{
	   tag_id:134, 
	   tag_name:"Ai Leaders",
	   category_id:5,
	   tag_desc:"Pioneering Ai Tools And Platforms Leading The Industry."
	},
	{
	   tag_id:135, 
	   tag_name:"Ai Video Editor",
	   category_id:6,
	   tag_desc:"Ai Applications For Editing And Enhancing Video Content."
	},
	{
	   tag_id:136, 
	   tag_name:"Ai 3d Animation",
	   category_id:6,
	   tag_desc:"Ai Tools For Creating And Manipulating 3d Animations."
	},
	{
	   tag_id:137, 
	   tag_name:"Ai Video Generators",
	   category_id:6,
	   tag_desc:"Ai Solutions For Generating Video Content."
	},
	{
	   tag_id:138, 
	   tag_name:"Ai Writing Tools",
	   category_id:6,
	   tag_desc:"Ai Tools For Assisting In Writing And Content Creation."
	},
	{
	   tag_id:139, 
	   tag_name:"Ai Audio Enhancer",
	   category_id:6,
	   tag_desc:"Ai Applications For Improving And Modifying Audio Quality."
	},
	{
	   tag_id:140, 
	   tag_name:"Ai Voice Changer",
	   category_id:6,
	   tag_desc:"Ai Tools For Altering And Synthesizing Voice Outputs."
	},
	{
	   tag_id:141, 
	   tag_name:"Ai Image Enhancer",
	   category_id:6,
	   tag_desc:"Ai Applications For Improving And Editing Images."
	},
	{
	   tag_id:142, 
	   tag_name:"Ai Podcasting",
	   category_id:6,
	   tag_desc:"Ai Tools For Creating, Editing, And Enhancing Podcasts."
	},
	{
	   tag_id:143, 
	   tag_name:"Ai Script Writers",
	   category_id:6,
	   tag_desc:"Ai Applications For Writing Scripts For Various Formats."
	},
	{
	   tag_id:144, 
	   tag_name:"Ai Sound Effects",
	   category_id:6,
	   tag_desc:"Ai Tools For Creating And Editing Sound Effects."
	},
	{
	   tag_id:145, 
	   tag_name:"Ai Upscalers",
	   category_id:6,
	   tag_desc:"Ai Tools For Enhancing Image And Video Resolution."
	},
	{
	   tag_id:146, 
	   tag_name:"Ai Studio",
	   category_id:6,
	   tag_desc:"Ai-powered Studios For Content Creation And Editing."
	},
	{
	   tag_id:147, 
	   tag_name:"Ai Image Toolsets",
	   category_id:6,
	   tag_desc:"Comprehensive Ai Tools For Image Editing And Manipulation."
	},
	{
	   tag_id:148, 
	   tag_name:"Ai Generative Fill",
	   category_id:6,
	   tag_desc:"Ai Solutions For Generating Content To Fill Gaps Or Needs."
	},
	{
	   tag_id:149, 
	   tag_name:"Ai Image Transformers",
	   category_id:6,
	   tag_desc:"Ai Applications For Transforming And Altering Images."
	},
	{
	   tag_id:150, 
	   tag_name:"Ai Background Remover",
	   category_id:6,
	   tag_desc:"Ai Tools For Automatically Removing Backgrounds From Images."
	},
	{
	   tag_id:151, 
	   tag_name:"Ai Vocal Remover",
	   category_id:6,
	   tag_desc:"Ai Applications For Isolating And Removing Vocals From Audio."
	},
	{
	   tag_id:152, 
	   tag_name:"Ai Talking Head",
	   category_id:6,
	   tag_desc:"Ai-generated Talking Head Videos For Various Purposes."
	},
	{
	   tag_id:153, 
	   tag_name:"Ai Galleries",
	   category_id:6,
	   tag_desc:"Ai-curated Or Ai-created Art And Media Galleries."
	},
	{
	   tag_id:154, 
	   tag_name:"Ai Clips",
	   category_id:6,
	   tag_desc:"Ai Tools For Creating And Editing Short Video Clips."
	},
	{
	   tag_id:155, 
	   tag_name:"Ai Portraits",
	   category_id:6,
	   tag_desc:"Ai Applications For Creating And Enhancing Portrait Images."
	},
	{
	   tag_id:156, 
	   tag_name:"Ai 3d Worlds",
	   category_id:6,
	   tag_desc:"Ai Platforms For Creating And Exploring 3d Virtual Worlds."
	},
	{
	   tag_id:157, 
	   tag_name:"Ai Replicators",
	   category_id:6,
	   tag_desc:"Ai Tools For Replicating Styles, Patterns, Or Content."
	},
	{
	   tag_id:158, 
	   tag_name:"Ai Bring To Life",
	   category_id:6,
	   tag_desc:"Ai Solutions For Animating Or Bringing Digital Content To Life."
	},
	{
	   tag_id:159, 
	   tag_name:"Ai Image Scanners",
	   category_id:6,
	   tag_desc:"Ai Tools For Scanning And Analyzing Images."
	},
	{
	   tag_id:160, 
	   tag_name:"Ai Image Mixers",
	   category_id:6,
	   tag_desc:"Ai Applications For Blending And Combining Images."
	},
	{
	   tag_id:161, 
	   tag_name:"Ai Qr Codes",
	   category_id:6,
	   tag_desc:"Ai Tools For Generating And Interpreting Qr Codes."
	},
	{
	   tag_id:162, 
	   tag_name:"Ai Assets",
	   category_id:6,
	   tag_desc:"Ai-generated Or Ai-enhanced Digital Assets."
	},
	{
	   tag_id:163, 
	   tag_name:"Ai Covers",
	   category_id:6,
	   tag_desc:"Ai Tools For Designing Book, Album, Or Other Types Of Covers."
	},
	{
	   tag_id:164, 
	   tag_name:"Ai Discord Apps",
	   category_id:6,
	   tag_desc:"Ai Applications And Bots Designed For Discord."
	},
	{
	   tag_id:165, 
	   tag_name:"Ai Medical Assistant",
	   category_id:7,
	   tag_desc:"Ai Tools For Healthcare Assistance And Medical Diagnostics."
	},
	{
	   tag_id:166, 
	   tag_name:"Ai Productivity",
	   category_id:7,
	   tag_desc:"Ai Applications Designed To Increase Personal And Professional Productivity."
	},
	{
	   tag_id:167, 
	   tag_name:"Ai Workflow",
	   category_id:7,
	   tag_desc:"Ai Systems For Optimizing And Managing Workflow Processes."
	},
	{
	   tag_id:168, 
	   tag_name:"Ai Fitness",
	   category_id:7,
	   tag_desc:"Ai-powered Tools For Fitness Tracking And Personalized Workout Plans."
	},
	{
	   tag_id:169, 
	   tag_name:"Ai Home Devices",
	   category_id:7,
	   tag_desc:"Smart Devices Enhanced With Ai For Home Automation And Management."
	},
	{
	   tag_id:170, 
	   tag_name:"Ai News Sites",
	   category_id:7,
	   tag_desc:"Ai-driven Platforms For Personalized News Aggregation And Analysis."
	},
	{
	   tag_id:171, 
	   tag_name:"Ai Social Network",
	   category_id:7,
	   tag_desc:"Social Networking Platforms Utilizing Ai For Enhanced User Experiences."
	},
	{
	   tag_id:172, 
	   tag_name:"Ai Coach",
	   category_id:7,
	   tag_desc:"Ai Systems Offering Coaching And Advice In Various Fields."
	},
	{
	   tag_id:173, 
	   tag_name:"Ai Travel Advisor",
	   category_id:7,
	   tag_desc:"Ai Tools For Travel Planning And Recommendations."
	},
	{
	   tag_id:174, 
	   tag_name:"Ai Self-help",
	   category_id:7,
	   tag_desc:"Ai Applications Focused On Personal Development And Self-improvement."
	},
	{
	   tag_id:175, 
	   tag_name:"Ai Memory Assistants",
	   category_id:7,
	   tag_desc:"Ai Tools Designed To Aid In Memory And Recall."
	},
	{
	   tag_id:176, 
	   tag_name:"Ai Fashion",
	   category_id:7,
	   tag_desc:"Ai In The Fashion Industry For Trend Prediction And Style Advice."
	},
	{
	   tag_id:177, 
	   tag_name:"Ai Interior Designs",
	   category_id:7,
	   tag_desc:"Ai Tools For Interior Design Planning And Visualization."
	},
	{
	   tag_id:178, 
	   tag_name:"Ai Calendar",
	   category_id:7,
	   tag_desc:"Ai-enhanced Calendar Tools For Better Schedule Management."
	},
	{
	   tag_id:179, 
	   tag_name:"Ai Dating",
	   category_id:7,
	   tag_desc:"Ai-driven Platforms For Dating And Relationship Building."
	},
	{
	   tag_id:180, 
	   tag_name:"Ai For Kids",
	   category_id:7,
	   tag_desc:"Ai Tools And Applications Specifically Designed For Children."
	},
	{
	   tag_id:181, 
	   tag_name:"Ai Cook",
	   category_id:7,
	   tag_desc:"Ai Applications For Recipe Generation And Cooking Assistance."
	},
	{
	   tag_id:182, 
	   tag_name:"Ai Life Manager",
	   category_id:7,
	   tag_desc:"Ai Systems For Managing Various Aspects Of Personal Life."
	},
	{
	   tag_id:183, 
	   tag_name:"Ai Idea Builder",
	   category_id:7,
	   tag_desc:"Ai Tools To Help Generate And Develop New Ideas."
	},
	{
	   tag_id:184, 
	   tag_name:"Ai Career Path",
	   category_id:7,
	   tag_desc:"Ai Guidance For Career Planning And Development."
	},
	{
	   tag_id:185, 
	   tag_name:"Ai Naming",
	   category_id:7,
	   tag_desc:"Ai Tools For Generating Names For Businesses, Products, Or Projects."
	},
	{
	   tag_id:186, 
	   tag_name:"Ai Note Manager",
	   category_id:7,
	   tag_desc:"Ai-enhanced Tools For Note-taking And Information Organization."
	},
	{
	   tag_id:187, 
	   tag_name:"Ai Events And Activities",
	   category_id:7,
	   tag_desc:"Ai Systems For Discovering And Organizing Events And Activities."
	},
	{
	   tag_id:188, 
	   tag_name:"Ai Inspiration",
	   category_id:7,
	   tag_desc:"Ai Tools Designed To Inspire Creativity And Innovation."
	},
	{
	   tag_id:189, 
	   tag_name:"Ai Automated Messaging",
	   category_id:7,
	   tag_desc:"Ai-driven Systems For Automated Messaging And Communication."
	},
	{
	   tag_id:190, 
	   tag_name:"Ai Preference Curators",
	   category_id:7,
	   tag_desc:"Ai Tools For Curating Content And Products Based On User Preferences."
	},
	{
	   tag_id:191, 
	   tag_name:"Ai Powered Appliances",
	   category_id:7,
	   tag_desc:"Home And Kitchen Appliances Enhanced With Ai Capabilities."
	},
	{
	   tag_id:192, 
	   tag_name:"Ai Body Art",
	   category_id:7,
	   tag_desc:"Ai Applications In The Creation And Design Of Body Art."
	},
	{
	   tag_id:193, 
	   tag_name:"Ai Religion",
	   category_id:7,
	   tag_desc:"Ai Tools Exploring And Interacting With Religious Content And Practices."
	},
	{
	   tag_id:194, 
	   tag_name:"Ai Divination",
	   category_id:7,
	   tag_desc:"Ai Systems Mimicking Traditional Divination Methods For Predictions."
	}
  ]);

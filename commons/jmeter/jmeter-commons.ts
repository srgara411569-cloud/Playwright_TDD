import { exec } from "child_process";

export class JMeterCommons {

    //Common method to run from Command Line
    public runCommandLine(command: string): Promise<string> {
        return new Promise((resolve, reject) => {

            //code to run the command            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                }else{
                    resolve(stdout);
                }
                console.log(`Command: ${command} is executed successfully.`);
              
            });

        });
    }



// Common method to run JMETER test plan
async runJMeterTestPlan(testPlanPath: string): Promise<void> {
     console.log(`Running JMeter test plan: ${testPlanPath}`);

     //Update the Relative path of Jmeter Folder Structure
     const projectRoot = process.cwd();//Playwright_TDD
     const jmeterBasePath = `${projectRoot}/tests/load/jmeter/`;
     const jmeterToolPath = `${jmeterBasePath}bin/jmeter.bat`;
     const jmeterTestPlanPath = `${jmeterBasePath}testplans/${testPlanPath}`;   

     //Update the Relative Path of Jmeter Folder Structure
     console.log('Generating results and  reports for JMETER test plna:${testPlanPath}');
     const resultsPath = `${jmeterBasePath}results/TestResults_${Date.now()}.csv`;
     const reportPath='${jmeterBasePath}/report-output';

     //Run the Jmeter test plab and generate the csv test results report    
     const command = `"${jmeterToolPath}" -n -t "${jmeterTestPlanPath}" -l "${resultsPath}" -e -o "${reportPath}"`;
     console.log(`Executing command: ${command}`);
     await this.runCommandLine(command);
     console.log(`JMeter test plan ${testPlanPath} executed successfully. Results saved to ${resultsPath} and report generated at ${reportPath}`);

    }  


}
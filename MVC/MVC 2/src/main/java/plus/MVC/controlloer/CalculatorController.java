package plus.MVC.controlloer;

import plus.MVC.model.Calculation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CalculatorController {

    @GetMapping("/")
    public String showForm() {
        return "form";
    }

    @PostMapping("/calculate")
    public String calculate(@RequestParam("num1") int num1,
                            @RequestParam("num2") int num2,
                            Model model) {
        Calculation calculation = new Calculation();
        calculation.setNum1(num1);
        calculation.setNum2(num2);
        calculation.setResult(num1 + num2);

        model.addAttribute("calculation", calculation);
        return "result";
    }
}
